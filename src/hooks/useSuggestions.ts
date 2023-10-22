import { useQuery } from 'react-query'

import { getSuggestions } from '../client/bffClient'
import { SuggestionsResponse } from '../types'

const useSuggestions = (searchText: string) => {
  const {
    data: suggestionsData,
    isLoading: isSuggestionsLoading,
    isError: isSuggestionsError,
  } = useQuery<SuggestionsResponse | undefined>(
    ['suggestions', `${searchText}`],
    () => getSuggestions(searchText),
    {
      retry: false,
      enabled: !!searchText,
    },
  )

  return { suggestionsData, isSuggestionsLoading, isSuggestionsError }
}

export default useSuggestions
