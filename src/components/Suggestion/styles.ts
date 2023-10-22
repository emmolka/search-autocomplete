import styled from 'styled-components'
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg'
import { ReactComponent as ClockIcon } from '../../icons/clock-icon.svg'

export const SuggestionWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.lightGrey};
  padding: 0 20px 0 12px;
  &:hover {
    background-color: #3c4043;
    border-radius: 4px;
  }
`

export const StyledSearchIcon = styled(SearchIcon)`
  color: ${({ theme }) => theme.lightGrey};
  width: 20px;
  height: 20px;
  margin-right: 8.5px;
`
export const StyledClockIcon = styled(ClockIcon)`
  width: 20px;
  height: 20px;
  margin-right: 8.5px;
  color: ${({ theme }) => theme.lightGrey};
`
export const DeleteText = styled.p`
  cursor: pointer;
  z-index: 100;
`

export const SuggestionText = styled.p<{ hasbeensearched?: number }>`
  padding: 6px 0;
  color: ${({ hasbeensearched, theme }) => (hasbeensearched ? theme.purple : 'inherit')};
`
export const TextIconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
