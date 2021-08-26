import React from 'react'
import styled from 'styled-components'
import { Checkbox, ListIcon } from '../../uiKit'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  align-items: flex-end;
`

const Trigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: ${props => props.theme.dimensions.tableHeaderHeight};
  box-shadow: none;
  cursor: pointer;
  transition: all ${props => props.theme.animationTime};

  &.expanded {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.accentGreen};
    box-shadow: 0px 5px 5px rgba(0, 0, 0, .2);
  }
`

const ListContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  width: 140px;
  font-size: 13px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, .2);
  display: none;
  opacity: 0;
  visibility: hidden;
  transition: all ${props => props.theme.animationTime};

  &.expanded {
    display: block;
    z-index: 1;
    opacity: 1;
    visibility: visible;
  }
`

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 38px;
  padding-left: 12px;

  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.gray};
  }
`

export type ColumnType = 'name'|'email'|'city'|'phone'

interface ColumnSelectorProps {
  expanded: boolean
  selectedColumns: ColumnType[]
  onColumnsChange: (column: ColumnType) => void
  onExpandToggle: () => void
}

export function ColumnSelector(props: ColumnSelectorProps) {
  return (
    <Container>
      <Trigger
        className={props.expanded ? 'expanded' : ''}
        onClick={props.onExpandToggle}
      >
        <ListIcon />
      </Trigger>
      <ListContainer className={props.expanded ? 'expanded' : ''}>
        <CheckboxWrapper>
          <Checkbox
            id="name"
            checked={props.selectedColumns.includes('name')}
            onChange={() => props.onColumnsChange('name')}
          >
            Name
          </Checkbox>
        </CheckboxWrapper>
        <CheckboxWrapper>
          <Checkbox
            id="city"
            checked={props.selectedColumns.includes('city')}
            onChange={() => props.onColumnsChange('city')}
          >
            City
          </Checkbox>
        </CheckboxWrapper>
        <CheckboxWrapper>
          <Checkbox
            id="email"
            checked={props.selectedColumns.includes('email')}
            onChange={() => props.onColumnsChange('email')}
          >
            Email
          </Checkbox>
        </CheckboxWrapper>
        <CheckboxWrapper>
          <Checkbox
            id="phone"
            checked={props.selectedColumns.includes('phone')}
            onChange={() => props.onColumnsChange('phone')}
          >
            Phone
          </Checkbox>
        </CheckboxWrapper>
      </ListContainer>
    </Container>
  )
}
