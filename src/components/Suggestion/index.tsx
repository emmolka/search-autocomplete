import {
  SuggestionWrapper,
  StyledSearchIcon,
  StyledClockIcon,
  DeleteText,
  SuggestionText,
  TextIconWrapper,
} from './styles'

interface SuggestionProps {
  text: string
  hasBeenSearched?: boolean
  onClick?: () => void
  onRemove?: (e: React.MouseEvent<HTMLParagraphElement>) => void
}

const Suggestion = ({ text, onClick, onRemove, hasBeenSearched }: SuggestionProps) => (
  <SuggestionWrapper onMouseDown={onClick}>
    <TextIconWrapper>
      {hasBeenSearched ? <StyledClockIcon /> : <StyledSearchIcon />}
      <SuggestionText hasbeensearched={Number(hasBeenSearched)}>{text}</SuggestionText>
      {/* hasbeensearched is lower case and passed as a number to prevent dev tools warnings*/}
    </TextIconWrapper>
    {hasBeenSearched && <DeleteText onMouseDown={onRemove}>Remove</DeleteText>}
  </SuggestionWrapper>
)

export default Suggestion
