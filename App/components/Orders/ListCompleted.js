import React, { PureComponent } from 'react'

import { consume } from '../../stores'

import ListView from './ListView'

const filterOrder = orders => orders.filter(order => order.status === 1)

export default consume(
  'orders',
  ({ orderActions: { fetchList } }) => ({
    fetchList,
    filterOrder
  })
)(ListView)