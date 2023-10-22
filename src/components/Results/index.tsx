import {
  RequestInformation,
  Description,
  Title,
  StyledLink,
  ResultWrapper,
  ResultsWrapper,
} from './styles'
import { ResultsType } from '../../types'

interface ResultsProps {
  resultsAmount?: number
  timeTaken?: string
  results?: ResultsType[]
  isError?: boolean
  isLoading?: boolean
}

const Results = ({ results, resultsAmount, timeTaken, isError, isLoading }: ResultsProps) => (
  <ResultsWrapper hideborder={Number(!resultsAmount)}>
    {Boolean(resultsAmount && timeTaken) && (
      <RequestInformation>
        Results amount: {resultsAmount}, took: {timeTaken}ms
      </RequestInformation>
    )}
    {results?.map((result) => (
      <ResultWrapper key={`results-${result.id}`}>
        <StyledLink target='_blank' href={result.href}>
          <Title>{result.title}</Title>
        </StyledLink>
        <Description>{result.description}</Description>
      </ResultWrapper>
    ))}
    {results?.length === 0 && (
      <ResultWrapper>
        <Description>No results, please try again</Description>
      </ResultWrapper>
    )}
    {isLoading && (
      <ResultWrapper>
        <Description>Loading ...</Description>
      </ResultWrapper>
    )}
    {isError && (
      <ResultWrapper>
        <Description>Error occured, please try again later</Description>
      </ResultWrapper>
    )}
  </ResultsWrapper>
)

export default Results
