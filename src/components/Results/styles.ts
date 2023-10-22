import styled from 'styled-components'

export const ResultsWrapper = styled.div<{ hideborder?: number }>`
  display: flex;
  border-top: solid 1px ${({ theme, hideborder }) => (hideborder ? 'transparent' : theme.grey)};
  flex-direction: column;
  margin-top: 15px;
  width: 100%;
  max-width: 584px;
  max-height: 700px;
  overflow-y: auto;
`

export const RequestInformation = styled.p`
  color: #9aa0a6;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  margin-top: 18px;
`
export const Description = styled.p`
  color: ${({ theme }) => theme.lightGrey};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 2px;
`

export const Title = styled.h3`
  text-decoration: none;
  color: ${({ theme }) => theme.purple};
  font-size: 20px;
  font-weight: 400;
`

export const StyledLink = styled.a`
  text-decoration: none;
  width: fit-content;
`

export const ResultWrapper = styled.div`
  margin: 6px 0;
  display: flex;
  flex-direction: column;
`
