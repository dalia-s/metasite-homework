import styled from 'styled-components'

export const Button = styled.button`
  height: 35px;
  width: 106px;
  border-radius: 50px;
  border: none;
  background-color: ${props => props.theme.colors.accentGreen};
  color: ${props => props.theme.colors.white};
  cursor: pointer;

  &:hover:not(:active) {
    box-shadow: 0 0 7px ${props => props.theme.colors.backgroundGradientFrom};
  }
`