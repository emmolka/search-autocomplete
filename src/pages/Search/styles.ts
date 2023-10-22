import styled from 'styled-components'
import { ReactComponent as SearchIcon } from '../../icons/search-icon.svg'

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledInput = styled.input<{ roundedcorners?: number }>`
  margin-top: 15px;
  display: flex;

  position: relative;
  min-height: 44px;
  background: #202124;
  border: 1px solid ${({ theme }) => theme.grey};
  box-shadow: none;
  border-radius: 24px;
  position: relative;
  font-size: 16px;
  width: 100%;
  max-width: 584px;
  color: ${({ theme }) => theme.lightGrey};
  outline: none;
  padding: 0 40px;
  &:focus {
    background-color: ${({ theme }) => theme.darkGrey};
    box-shadow: 0 1px 6px 0 #171717;
    border-color: rgba(223, 225, 229, 0);
    border-bottom-left-radius: ${({ roundedcorners }) => (roundedcorners ? '24px' : '0px')};
    border-bottom-right-radius: ${({ roundedcorners }) => (roundedcorners ? '24px' : '0px')};
  }
  &:hover {
    background-color: ${({ theme }) => theme.darkGrey};
    box-shadow: 0 1px 6px 0 #171717;
    border-color: rgba(223, 225, 229, 0);
  }
`

export const InputWrapper = styled.div`
  position: relative;
  max-width: 584px;
  width: 100%;
`

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 27px;
  left: 12px;
  color: ${({ theme }) => theme.lightGrey};
  width: 20px;
  height: 20px;
`
