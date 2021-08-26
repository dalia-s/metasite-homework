import styled from 'styled-components'

export const TextInput = styled.input`
  font-size: 1em;
  background-color: transparent;
  color: ${props => props.theme.colors.white};
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.white};
  caret-color: ${props => props.theme.colors.white};
  padding: 0.3em 0;
  width: 170px;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: ${props => props.theme.colors.white};
  }
`