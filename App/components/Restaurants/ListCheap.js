import React, { PureComponent } from 'react'

import { consume } from '../../stores'
import ListView from './ListView'

export default consume(
  ({ restaurants }) => ({
    restaurants: restaurants.cheap,
    listName: 'CHEAP'
  }),
  ({ restaurantActions: { fetchList } }) => ({ fetchList })
)(ListView)
