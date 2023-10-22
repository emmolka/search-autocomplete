import { rest } from 'msw'
import searchResults from './searchResults'
import { SuggestionsParams, SuggestionsResponse, SearchParams, SearchResponse } from '../types'

export const handlers = [
  rest.get<SuggestionsParams, never, SuggestionsResponse>('api/suggestions', (req, res, ctx) => {
    const start = performance.now()

    const text = req.url.searchParams.get('text')
    const limit = req.url.searchParams.get('limit')

    if (!text) {
      const timeTaken = performance.now() - start
      return res(
        ctx.status(200),
        ctx.json({
          text: text || '',
          results: [],
          timeTaken,
        }),
      )
    }

    const foundResults = [...searchResults]
      .filter((result) => result.title.toLowerCase().includes(text.toLowerCase()))
      .map((result) => result.title)
      .slice(0, Number(limit || 10))

    const timeTaken = performance.now() - start
    return res(
      ctx.status(200),
      ctx.json({
        text,
        results: foundResults,
        timeTaken,
      }),
    )
  }),
  rest.get<SearchParams, never, SearchResponse>('api/search', (req, res, ctx) => {
    const start = performance.now()

    const text = req.url.searchParams.get('text')

    if (!text) {
      const timeTaken = performance.now() - start
      return res(
        ctx.status(200),
        ctx.json({
          text: text || '',
          results: [],
          timeTaken,
        }),
      )
    }

    const foundResults = [...searchResults].filter((result) =>
      result.title.toLowerCase().includes(text.toLowerCase()),
    )

    const timeTaken = performance.now() - start
    return res(
      ctx.status(200),
      ctx.json({
        text,
        results: foundResults,
        timeTaken,
      }),
    )
  }),
]
