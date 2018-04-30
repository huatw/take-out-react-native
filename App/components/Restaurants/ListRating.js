import React, { PureComponent } from 'react'

import { consume } from '../../stores'
import requireAuth from '../../hoc/requireAuth'

import ListView from './ListView'

export default consume(
  ({ restaurants }) => ({
    restaurants: restaurants.rating,
    listName: 'RATING'
  }),
  ({ restaurantActions: { fetchList } }) => ({ fetchList })
)(ListView)

