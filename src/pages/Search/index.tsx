import useSuggestions from '../../hooks/useSuggestions'
import { useDebounce } from '../../hooks/useDebounce'
import useSearch from '../../hooks/useSearch'
import { useState, useMemo, useRef } from 'react'
import {
  InputWrapper,
  StyledInput,
  StyledSearchIcon,
  SearchWrapper,
  StyledCancelIcon,
} from './styles'
import Results from '../../components/Results'
import Suggestions from '../../components/Suggestions'

const SearchPage = () => {
  // input value used to retrieve suggestion results
  const [inputValue, setInputValue] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)

  // getting the search history on initial render
  const [searchHistory, setSearchHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem('search-history') || '[]'),
  )

  // value used to retrieve search results
  const [searchValue, setSearchValue] = useState('')

  const inputRef = useRef<HTMLInputElement | null>(null)

  const debouncedValue = useDebounce<string>(inputValue, 500)

  // using debouncedValue to prevent request on every input change, limit of results to 10
  const { suggestionsData } = useSuggestions(debouncedValue, 10)

  const { searchData, isSearchError, isSearchLoading } = useSearch(searchValue)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value)

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchValue(inputValue)
      inputRef?.current?.blur()

      // if no previous search history is available, create one in local storage
      if (!searchHistory?.length) {
        setSearchHistory([inputValue])
        return localStorage.setItem('search-history', JSON.stringify([inputValue]))
      }
      const historyItems: string[] = [...searchHistory, inputValue]
      setSearchHistory(historyItems)
      return localStorage.setItem('search-history', JSON.stringify(historyItems))
    }
  }

  const areSuggestionsAvailable = useMemo(
    () => Boolean(suggestionsData?.results.length),
    [suggestionsData],
  )

  const suggestionsToRender = useMemo(
    () =>
      suggestionsData?.results.sort((a) => {
        if (!searchHistory.includes(a)) {
          return 1
        }
        return -1
      }),
    // sorting suggestions to display the previously searched as the first ones
    [suggestionsData, searchHistory],
  )

  const onSuggestionRemove = (e: React.MouseEvent<HTMLParagraphElement>, result: string) => {
    // prevent losing input focus
    e.preventDefault()
    e.stopPropagation()

    // history has to be defined as onSuggestionRemove wouldn't be accessible

    const filteredItems = [...searchHistory]?.filter((item) => item !== result) || []
    setSearchHistory(filteredItems)
    return localStorage.setItem('search-history', JSON.stringify(filteredItems))
  }

  const onSuggestionClick = (result: string) => {
    // set input value
    setInputValue(result)
    // remove focus from input
    inputRef.current?.blur()
    // set value to search results
    setSearchValue(result)

    // if no previous search history is available, create one in local storage
    if (!searchHistory?.length) {
      setSearchHistory([result])
      return localStorage.setItem('search-history', JSON.stringify([result]))
    }
    const historyItems: string[] = [...searchHistory, result]
    setSearchHistory(historyItems)
    return localStorage.setItem('search-history', JSON.stringify(historyItems))
  }

  const onClearInput = () => {
    // prevent losing input focus
    inputRef?.current?.focus()
    setInputValue('')
  }

  return (
    <SearchWrapper>
      <InputWrapper>
        <StyledInput
          autoFocus
          // To focus on initial load
          value={inputValue}
          onChange={onInputChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          roundedcorners={Number(!areSuggestionsAvailable)}
          onKeyDown={onKeyDown}
          ref={inputRef}
        />
        <StyledSearchIcon />
        {isInputFocused && areSuggestionsAvailable && (
          <Suggestions
            suggestions={suggestionsToRender}
            onSuggestionClick={(result) => onSuggestionClick(result)}
            onSuggestionRemove={(e, result) => onSuggestionRemove(e, result)}
            searchHistory={searchHistory}
          />
        )}
        {inputValue && <StyledCancelIcon onClick={onClearInput} />}
      </InputWrapper>
      <Results
        resultsAmount={searchData?.results.length}
        timeTaken={searchData?.timeTaken.toFixed(2)}
        results={searchData?.results}
        isError={isSearchError}
        isLoading={isSearchLoading}
      />
    </SearchWrapper>
  )
}

export default SearchPage
