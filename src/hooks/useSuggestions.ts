import { useQuery } from 'react-query'

import { getSuggestions } from '../client/bffClient'
import { SuggestionsResponse } from '../types'

const useSuggestions = (searchText: string, limit?: number) => {
  const {
    data: suggestionsData,
    isLoading: isSuggestionsLoading,
    isError: isSuggestionsError,
  } = useQuery<SuggestionsResponse | undefined>(
    ['suggestions', `${searchText}`, `${limit || 10}`],
    () => getSuggestions(searchText, limit),
    {
      retry: false,
      enabled: !!searchText,
    },
  )

  return { suggestionsData, isSuggestionsLoading, isSuggestionsError }
}

export default useSuggestions
