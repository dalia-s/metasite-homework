import React from 'react'
import { shallow } from 'enzyme'
import { Filter } from './pages/mainPage/filter'
import { Table } from './pages/mainPage/table'
import { Preview } from './pages/mainPage/preview'

const exampleContact = {
  city: 'London',
  email: 'email@email.com',
  id: '123456',
  isActive: true,
  name: 'John',
  surname: 'Smith',
  phone: '+44 123456789'
}

const defaultTableProps = {
  contactsList: [exampleContact],
  sortAsc: true,
  previewId: '',
  onSortChange: jest.fn(),
  onShowPreview: jest.fn()
}

const defaultFilterProps = {
  cityList: [],
  onApplyFilter: jest.fn(),
}

describe('App', () => {
  it('Should render Table', () => {
    const wrapper = shallow(<Table {...defaultTableProps} />)
    expect(wrapper.find('#id-123456')).toExist()
  })

  it('Should highlight Table row if preview is opened', () => {
    const props = {...defaultTableProps}
    props.previewId = exampleContact.id
    const wrapper = shallow(<Table {...props} />)
    const contactRow = wrapper.find('#id-123456')
    expect(contactRow).toExist()
    expect(contactRow).toHaveClassName('highlighted')
  })

  it('Should sort on Name header click', () => {
    const wrapper = shallow(<Table {...defaultTableProps} />)
    wrapper.find('.interactive').simulate('click')
    expect(defaultTableProps.onSortChange).toHaveBeenCalledTimes(1)
  })

  it('Should render Preview', () => {
    const wrapper = shallow(<Preview contactId="123"/>)
    expect(wrapper.find('#preview-table')).toExist()
  })

  it('Should render Filter elements', () => {
    const wrapper = shallow(<Filter {...defaultFilterProps} />)
    expect(wrapper.find('#name-filter')).toExist()
    expect(wrapper.find('#city-filter')).toExist()
    expect(wrapper.find('#active-filter')).toExist()
    expect(wrapper.find('#filter-button')).toExist()
  })

  it('Should apply filter settings when filter button clicked', () => {
    const wrapper = shallow(<Filter {...defaultFilterProps} />)
    wrapper.find('#name-filter').simulate('change', { target: { value: 'John' } })
    wrapper.find('#city-filter').simulate('change', { target: { value: 'London' } })
    wrapper.find('#filter-button').simulate('click')
    const payload = {
      name: 'John',
      city: 'London',
      showActiveOnly: false
    }
    expect(defaultFilterProps.onApplyFilter).toHaveBeenCalledTimes(1)
    expect(defaultFilterProps.onApplyFilter).toHaveBeenCalledWith(payload)
  })
})
