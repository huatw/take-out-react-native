import fetchGraphql from '../../../utils/fetchGraphql'

import session from './session'
import user from './user'
import address from './address'
import restaurant from './restaurant'
import order from './order'
import food from './food'
import rating from './rating'

const wrap = obj => Object.entries(obj).reduce(
  (acc, [key, q]) => ({ ...acc, [key]: (vars) => fetchGraphql(q, vars) }),
  {}
)

export const sessionAPI = wrap(session)
export const userAPI = wrap(user)
export const addressAPI = wrap(address)
export const restaurantAPI = wrap(restaurant)
export const orderAPI = wrap(order)
export const foodAPI = wrap(food)
export const ratingAPI = wrap(rating)

export default {
  sessionAPI,
  userAPI,
  addressAPI,
  restaurantAPI,
  orderAPI,
  foodAPI,
  ratingAPI
}