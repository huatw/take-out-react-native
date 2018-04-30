import createStore from '../../utils/minimalContext'

import actions from './actions'

const initialState = {
  users: [
    { name: 'name1', id: 1, selected: true },
    { name: 'name2', id: 2, selected: false},
    { name: 'name3', id: 3, selected: true }
  ],
  photos: [
    { owner: 'owner1', id: 1},
    { owner: 'owner2', id: 2},
    { owner: 'owner3', id: 3},
  ]
}

const store = createStore({
  initialState,
  actions
})

export const { provide, consume } = store
export default store
