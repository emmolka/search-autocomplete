import { SuggestionsWrapper, SuggestionsSeparator } from './styles'

import Suggestion from '../Suggestion'

interface SuggestionsProps {
  suggestions: string[] | undefined
  isSuggestionsError?: boolean
  isSuggestionsLoading?: boolean
  onSuggestionClick: (result: string) => void
  onSuggestionRemove: (e: React.MouseEvent<HTMLParagraphElement>, result: string) => void
  searchHistory: string[]
}

const Suggestions = ({
  suggestions,
  isSuggestionsError,
  isSuggestionsLoading,
  onSuggestionClick,
  onSuggestionRemove,
  searchHistory,
}: SuggestionsProps) => (
  <SuggestionsWrapper>
    <SuggestionsSeparator />
    {suggestions?.map((result, index) => (
      <Suggestion
        text={result}
        key={`${result}${index}`}
        hasBeenSearched={searchHistory.includes(result)}
        onClick={() => onSuggestionClick(result)}
        onRemove={(e) => onSuggestionRemove(e, result)}
      />
    ))}
    {isSuggestionsError && <Suggestion text='Error occured' />}
    {isSuggestionsLoading && <Suggestion text='Loading...' />}
  </SuggestionsWrapper>
)

export default Suggestions
