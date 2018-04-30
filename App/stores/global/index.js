import createStore from '../../utils/minimalContext'

import actions from './actions'

const initialState = {
  session: {
    initing: true,
    username: '',
    createtime: '',
    nickname: '',
    thumbnail: ''
  },
  address: { // only gps used right now
    initing: true,
    state: '',
    city: '',
    street: '',
    full: '',
    gps: []
  },
  restaurants: {
    name: [],
    cuisine: [],
    hot: [],
    cheap: [],
    quick: [],
    rating: [],
    saved: []
  },
  restaurant: { // restaurant info
    id: '',
    name: '',
    cuisine: '',
    description: '',
    thumbnail: '',
    createtime: '',
    updatetime: '',
    address: { full: '' },
    foods: [], //id name cuisine price thumbnail
    ratings: [], // restaurant ratings
  },
  cart: {}, // { restaurant_id: {} }
  food: {}, // food detail page
  orderSearch: [],
  orders: [],
  order: {}
}

const store = createStore({
  initialState,
  actions
})

export const { provide, consume, Consumer, Provider } = store
export default store
