import React, { useState } from 'react'
import styled from 'styled-components'
import { ContactDetails } from '../../services/service'
import { ColumnSelector, ColumnType } from './columnSelector'
import { abbreviateName } from '../../utils'
import { DataTable, HeaderCell, DataRow, EyeIcon, ArrowIcon } from '../../uiKit'

const TableContainer = styled.div`
  background: white;
  flex: 1;
  overflow: hidden;
  max-width: ${props => props.theme.dimensions.tableWidth};
  border-radius: 0 0 0 ${props => props.theme.dimensions.borderRadius};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, .2);
  transition: border-radius 0s;

  &.round-right-corner {
    border-radius: ${props => `0 0 ${props.theme.dimensions.borderRadius} ${props.theme.dimensions.borderRadius}`};
    transition: border-radius 0s ${props => props.theme.animationTime};
  }
`

interface TableProps {
  contactsList: ContactDetails[]
  sortAsc: boolean
  previewId: string
  onSortChange: () => void
  onShowPreview: (id: string) => void
}

export function Table(props: TableProps) {
  const [selectedColumns, setSelectedColumns] = useState<ColumnType[]>(['name', 'email', 'city', 'phone'])
  const [columnSelectorExpanded, setColumnSelectorExpanded] = useState<boolean>(false)

  const onColumnsChange = (column: ColumnType) => {
    let updatedColumnsList = [...selectedColumns]
    if (selectedColumns.includes(column)) {
      updatedColumnsList = updatedColumnsList.filter(c => c !== column)
    } else {
      updatedColumnsList.push(column)
    }
    setSelectedColumns(updatedColumnsList)
  }

  const showNameColumn = selectedColumns.includes('name')
  const showCityColumn = selectedColumns.includes('city')
  const showEmailColumn = selectedColumns.includes('email')
  const showPhoneColumn = selectedColumns.includes('phone')

  return (
    <TableContainer className={!!props.previewId ? '' : 'round-right-corner'}>
      <DataTable>
        <tbody>
          <tr>
            {showNameColumn &&
              <HeaderCell className="interactive" onClick={props.onSortChange}>
                Name
                <ArrowIcon up={props.sortAsc} style={{marginLeft: '10px'}} />
              </HeaderCell>}
            {showCityColumn && <HeaderCell>City</HeaderCell>}
            <HeaderCell className="status-column"/>
            {showEmailColumn && <HeaderCell>Email</HeaderCell>}
            {showPhoneColumn && <HeaderCell alignRight>Phone</HeaderCell>}
            <HeaderCell align="right" className="placeholder-column">
              <ColumnSelector
                expanded={columnSelectorExpanded}
                selectedColumns={selectedColumns}
                onColumnsChange={onColumnsChange}
                onExpandToggle={() => setColumnSelectorExpanded(!columnSelectorExpanded)}
              />
            </HeaderCell>
          </tr>
          {props.contactsList.map(c =>
            <DataRow
              id={`id-${c.id}`}
              key={c.id}
              onClick={() => props.onShowPreview(c.id)}
              className={props.previewId === c.id ? 'highlighted' : ''}
              dimmed={columnSelectorExpanded}
            >
              {showNameColumn && <td>{c.name} {abbreviateName(c.surname)}</td>}
              {showCityColumn && <td>{c.city}</td>}
              <td className="status-column"><EyeIcon isActive={c.isActive} /></td>
              {showEmailColumn && <td>{c.email}</td>}
              {showPhoneColumn && <td align="right">{c.phone}</td>}
              <td className="placeholder-column"/>
            </DataRow>
          )}
        </tbody>
      </DataTable>
    </TableContainer>
  )
}