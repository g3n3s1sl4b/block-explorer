import React from 'react'
import { shallow } from 'enzyme'

import TableRow from '@material-ui/core/TableRow'

import { StyledTableRow } from '../../components/Table/Table'

import TransactionsList from './TransactionsList'

describe('<TransactionsList />', () => {
  test('It renders correctly', () => {
    const wrapper = shallow(
      <TransactionsList
        blockHash='test'
        transactions={[
          {
            id: 1,
            hash: '041e4a5c6fe659fds31f087059a2db6be65928765899b6110127ce169e4edfb',
            size: 1156,
            spends: [],
            notes: [],
            fee: '0.03283901',
          },
          {
            id: 2,
            hash: '042e4a5c6fe6591sf0f0f087059a2db6be65928765899b6110127ce169e4edfb',
            size: 1156,
            spends: [],
            notes: [],
            fee: '0.01083901',
          },
        ]}
      />,
    )
    expect(wrapper.find(TableRow)).toHaveLength(1)
    expect(wrapper.find(StyledTableRow)).toHaveLength(2)
  })
})
