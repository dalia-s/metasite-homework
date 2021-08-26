import React from 'react'
import styled from 'styled-components'
import { CheckmarkIcon } from '../uiKit/icons'

const CheckboxLabel = styled.label<{whiteLabel: boolean}>`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.whiteLabel ? props.theme.colors.white : props.theme.colors.text};
`

const CheckboxWrapper = styled.div<{narrow: boolean}>`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: ${props => props.narrow ? '8px' : '13px'};
`

const CheckboxInput = styled.input`
  appearance: none;
  background-color: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.accentGreen};
  width: 15px;
  height: 15px;
  margin: 0;
  cursor: pointer;
  &:checked {
    background-color: ${props => props.theme.colors.accentGreen};
  }
`

interface ChackboxProps {
  id: string
  checked: boolean
  children: React.ReactNode
  whiteLabel?: boolean
  narrow?: boolean
  onChange: (checkd: boolean) => void
}

export function Checkbox(props: ChackboxProps) {
  return (
    <CheckboxLabel htmlFor={props.id} whiteLabel={!!props.whiteLabel}>
      <CheckboxWrapper narrow={!!props.narrow}>
        <CheckmarkIcon className={props.checked ? 'checked' : ''}/>
        <CheckboxInput
          id={props.id}
          type="checkbox"
          checked={props.checked}
          onChange={ev => props.onChange(ev.target.checked)}
        />
      </CheckboxWrapper>
      {props.children}
    </CheckboxLabel>
  )
}