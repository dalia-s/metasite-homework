import styled from 'styled-components'

export const SingleSelect = styled.select`
  font-size: 1em;
  color: ${props => props.theme.colors.white};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.white};
  padding: 0.30em 0;
  width: 170px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`
export const SelectOption = styled.option`
  padding: 1em;
  font-size: 2rem;
`