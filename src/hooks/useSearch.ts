import { useQuery } from 'react-query'

import { getSearch } from '../client/bffClient'
import { SearchResponse } from '../types'

const useSearch = (searchText: string) => {
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useQuery<SearchResponse | undefined>(
    ['search', `${searchText}`],
    () => getSearch(searchText),
    {
      retry: false,
      enabled: !!searchText,
    },
  )

  return { searchData, isSearchLoading, isSearchError }
}

export default useSearch
