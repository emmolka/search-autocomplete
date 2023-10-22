import styled from 'styled-components'

export const SuggestionsWrapper = styled.div`
  position: absolute;
  top: 57px;
  width: 100%;
  max-width: 584px;
  background-color: ${({ theme }) => theme.darkGrey};
  padding: 8px 0 20px 0;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`
export const SuggestionsSeparator = styled.div`
  border-top: 1px solid ${({ theme }) => theme.grey};
  margin: 0 20px 0 14px;
  padding: 0 0 8px 0;
`
