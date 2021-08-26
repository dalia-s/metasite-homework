import styled from 'styled-components'

export const DataTable = styled.table`
  position: relative;
  background-color: #FFFFFF;
  table-layout: fixed;
  width: ${props => props.theme.dimensions.tableWidth};
  border-collapse: collapse;
  border: none;
  height: fit-content;

  th, td {
    padding: 0 25px;
  }
  th.status-column, td.status-column {
    width: 0;
  }
  th.placeholder-column, td.placeholder-column {
    width: 0;
  }
`

export const HeaderCell = styled.th<{alignRight?: boolean}>`
  background-color: ${props => props.theme.colors.accentGreen};
  color: #ffffff;
  height: ${props => props.theme.dimensions.tableHeaderHeight};
  cursor: auto;
  position: relative;
  font-weight: 500;
  text-align: ${props => props.alignRight ? 'right' : 'left'};

  &.interactive {
    cursor: pointer;
  }
`

export const DataRow = styled.tr<{dimmed?: boolean}>`
  height: 48px;
  cursor: pointer;
  transition: all ${props => props.theme.animationTime};

  :not(:first-child, :last-child){
    border-bottom: 1px solid ${props => props.dimmed ? '#aabfbf' : props.theme.colors.gray};
  }
  background-color: ${props => props.dimmed ? '#c7d4d2' : 'inherit'};

  &.highlighted {
    background-color: ${props => props.dimmed ? '#aabfbf' : props.theme.colors.gray};$
  }
`
