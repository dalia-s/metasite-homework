import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import cloneDeep from 'lodash/cloneDeep'
import { ServiceContext } from '../../services/context'
import { ContactDetails, FilterData } from '../../services/service'
import { sortByFullName, descendingSort } from '../../utils'
import { Table } from './table'
import { Preview } from './preview'
import { Filter } from './filter'

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-image: ${props => `radial-gradient(farthest-corner at 30% 75%,
    ${props.theme.colors.backgroundGradientFrom}, ${props.theme.colors.backgroundGradientTo})`};
  font-family: ${props => props.theme.fonts};
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  box-sizing: border-box;
`

const ContentContainer = styled.div`
  width: 1188px;
  margin: auto;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
`

const Body = styled.div`
  display: flex;
`

const Header = styled(Body)`
  height: ${props => props.theme.dimensions.filterHeight};
`

const Title = styled.div`
  color: ${props => props.theme.colors.white};
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.theme.dimensions.previewWidth};
`

export function MainPage() {
  const service = useContext(ServiceContext)
  const [fullList, setFullList] = useState<ContactDetails[]>([])
  const [displayList, setDisplayList] = useState<ContactDetails[]>([])
  const [sortAsc, setSortAsc] = useState<boolean>(true)
  const [previewId, setPreviewId] = useState<string>('')

  const getData = async () => {
    try {
      const data = await service.getContactsList()
      setDisplayList(data.sort(sortByFullName))
      setFullList(data)
    } catch {
      alert('Oops! We could not load the contact list. Please try again later.')
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSortChange = () => {
    const sortingFunction = sortAsc ? descendingSort(sortByFullName) : sortByFullName
    const displayListCopy = cloneDeep(displayList)
    setDisplayList(displayListCopy.sort(sortingFunction))
    setSortAsc(!sortAsc)
  }

  const onApplyFilter = (data: FilterData) => {
    let fullListCopy = cloneDeep(fullList)
    if (!!data.name) {
      fullListCopy = fullListCopy.filter(item => `${item.name} ${item.surname}`.toLowerCase().includes(data.name.toLowerCase()))
    }
    if (!!data.city) {
      fullListCopy = fullListCopy.filter(item => item.city === data.city)
    }
    if (data.showActiveOnly) {
      fullListCopy = fullListCopy.filter(item => item.isActive)
    }
    if (previewId && !fullListCopy.find(item => item.id === previewId)) {
      setPreviewId('')
    }
    const sortingFunction = sortAsc ? sortByFullName : descendingSort(sortByFullName)
    setDisplayList(fullListCopy.sort(sortingFunction))
  }

  const onShowPreview = (id: string) => {
    previewId === id ? setPreviewId('') : setPreviewId(id)
  }

  const getCityList = () => Array.from(new Set(fullList.map(l => l.city))).sort()

  return (
    <Background>
      <ContentContainer>
        <Header>
          <Filter
            cityList={getCityList()}
            onApplyFilter={onApplyFilter}
          />
          <Title>CONTACTIFY</Title>
        </Header>
        <Body>
          <Table
            contactsList={displayList}
            sortAsc={sortAsc}
            previewId={previewId}
            onSortChange={onSortChange}
            onShowPreview={onShowPreview}
          />
          <Preview
            contactId={previewId}
          />
        </Body>
      </ContentContainer>
    </Background>
  )
}