import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

import { consume } from '../../stores'

import ListView from './ListView'

export default consume(
  'orders',
  ({ orderActions: { fetchList } }) => ({ fetchList })
)(ListView)

