import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import SearchPage from './pages/Search'
import theme from './mocks/theme'

const GlobalStyles = createGlobalStyle`
 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: Arial;
 }

 body {
   background-color: #202124
 }
`

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <SearchPage />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
