import React, { useState } from 'react'
import styled from 'styled-components'
import { FilterData } from '../../services/service'
import { Checkbox, Button, EyeIcon, TextInput, SingleSelect, SelectOption } from '../../uiKit'

const Container = styled.div`
  background-image: linear-gradient(to right, #2065b6, #1c72d6);
  border-radius: ${props => `${props.theme.dimensions.borderRadius} ${props.theme.dimensions.borderRadius} 0 0`};
  flex: 1;
  display: flex;
  align-items: center;
  height: ${props => props.theme.dimensions.filterHeight};
  padding: 0 25px;
`

const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  margin-right: 40px;
`

interface FilterProps {
  cityList: string[]
  onApplyFilter: (data: FilterData) => void
}

export function Filter(props: FilterProps) {
  const [name, setName] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [showActiveOnly, setShowActiveOnly] = useState<boolean>(false)

  const onApplyFilter = () => {
    props.onApplyFilter({
      name,
      city,
      showActiveOnly
    })
  }

  return (
    <Container>
      <InputsWrapper>
        <TextInput
          id="name-filter"
          placeholder='Name'
          value={name}
          onChange={ev => setName(ev.target.value)}
        />
        <SingleSelect
          id="city-filter"
          onChange={ev => setCity(ev.target.value)}
        >
          <SelectOption value="">City</SelectOption>
          {props.cityList.map(city =>
            <SelectOption key={city} value={city}>{city}</SelectOption>
          )}
        </SingleSelect>
        <Checkbox
          id="active-filter"
          checked={showActiveOnly}
          onChange={value => setShowActiveOnly(value)}
          whiteLabel
          narrow
        >
          Show active
          <EyeIcon isActive style={{margin: '3px 0 0 5px'}}/>
        </Checkbox>
      </InputsWrapper>
      <Button
        id="filter-button"
        onClick={onApplyFilter}
      >
        FILTER
      </Button>
    </Container>
  )
}