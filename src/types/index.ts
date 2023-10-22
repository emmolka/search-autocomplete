export interface ResultsType {
  id: string
  title: string
  href: string
  description: string
}

export interface SuggestionsParams {
  text: string
  limit?: number
}

export interface SuggestionsResponse {
  text: string
  results: Partial<ResultsType['title']>[]
  timeTaken: number
}

export interface SearchParams {
  text: string
}

export interface SearchResponse {
  text: string
  timeTaken: number
  results: ResultsType[]
}
