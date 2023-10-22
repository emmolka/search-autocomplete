import { SuggestionsResponse, SearchResponse } from '../types'

export const getSuggestions = async (text: string): Promise<SuggestionsResponse> => {
  const url = `api/suggestions?text=${text}`

  return await fetch(url).then(async (response) => {
    if (response.status !== 200) {
      throw new Error(`Get suggestions endpoint: ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  })
}

export const getSearch = async (text: string): Promise<SearchResponse> => {
  const url = `api/search?text=${text}`

  return await fetch(url).then(async (response) => {
    if (response.status !== 200) {
      throw new Error(`Use search endpoint: ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  })
}
