import useSuggestions from '../../hooks/useSuggestions'
import { useDebounce } from '../../hooks/useDebounce'
import useSearch from '../../hooks/useSearch'
import { useState, useMemo, useRef } from 'react'
import { InputWrapper, StyledInput, StyledSearchIcon, SearchWrapper } from './styles'
import Results from '../../components/Results'
import Suggestions from '../../components/Suggestions'

const SearchPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem('search-history') || '[]'),
  )

  const [searchValue, setSearchValue] = useState('')

  const inputRef = useRef<HTMLInputElement | null>(null)

  const debouncedValue = useDebounce<string>(inputValue, 500)

  const { suggestionsData, isSuggestionsError, isSuggestionsLoading } =
    useSuggestions(debouncedValue)

  const { searchData, isSearchError, isSearchLoading } = useSearch(searchValue)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value)

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchValue(inputValue)
      inputRef?.current?.blur()
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
    [suggestionsData, searchHistory],
  )

  const onSuggestionRemove = (e: React.MouseEvent<HTMLParagraphElement>, result: string) => {
    e.stopPropagation()
    e.preventDefault()
    const history = localStorage.getItem('search-history')

    // history has to be defined as onSuggestionRemove wouldn't be accessible

    const historyItems: string[] | null = JSON.parse(history!)
    const filteredItems = historyItems?.filter((item) => item !== result) || []
    setSearchHistory(filteredItems)
    return localStorage.setItem('search-history', JSON.stringify(filteredItems))
  }

  const onSuggestionClick = (result: string) => {
    setInputValue(result)
    inputRef.current?.blur()
    setSearchValue(result)

    // saving search in localStorage
    const history = localStorage.getItem('search-history')
    if (!history) {
      setSearchHistory([result])
      return localStorage.setItem('search-history', JSON.stringify([result]))
    }
    const historyItems: string[] = JSON.parse(history)
    historyItems.push(result)
    setSearchHistory(historyItems)
    return localStorage.setItem('search-history', JSON.stringify(historyItems))
  }

  return (
    <SearchWrapper>
      <InputWrapper>
        <StyledInput
          autoFocus
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
            isSuggestionsError={isSuggestionsError}
            isSuggestionsLoading={isSuggestionsLoading}
            searchHistory={searchHistory}
          />
        )}
      </InputWrapper>
      {searchData && (
        <Results
          resultsAmount={searchData.results.length}
          timeTaken={searchData.timeTaken.toFixed(2)}
          results={searchData.results}
          isError={isSearchError}
          isLoading={isSearchLoading}
        />
      )}
    </SearchWrapper>
  )
}

export default SearchPage
