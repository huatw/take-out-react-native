import { orderAPI } from '../graphql'

const searchList = (keyword) => ({ orders }) => {
  const orderSearch = orders.filter(({ restaurant: { name } }) => name.includes(keyword) )

  return { orderSearch }
}

const clearSearch = () => {
  return { orderSearch: [] }
}

const fetch = async (id) => {
  const { order } = await orderAPI.fetch({ id })

  return { order }
}

const fetchList = async () => {
  const { orders } = await orderAPI.fetchList()

  return { orders }
}

const create = (restaurantId, full) => async ({ cart, orders, address }) => {
  const { foods, quantities } = Object.values(cart[restaurantId].foods).reduce(
    ({ foods, quantities }, { food, quantity }) => ({
      foods: [food.id, ...foods],
      quantities: [quantity, ...quantities]
    }),
    { foods: [], quantities: [] }
  )

  const { createOrder: newOrder } = await orderAPI.create({ foods, quantities, address: full, restaurantId })

  return {
    orders: [newOrder, ...orders],
    address: { ...address, full }
  }
}

const cancel = (orderId) => async ({ orders }) => {
  const { cancelOrder: newOrder } = await orderAPI.cancel({ orderId })

  return {
    orders: [newOrder, ...orders.filter(({ id }) => id !== orderId)]
  }
}

const complete = (orderId, content, stars) => async ({ orders }) => {
  const { completeOrder: newOrder } = await orderAPI.complete({ orderId, content, stars })

  return {
    orders: [newOrder, ...orders.filter(({ id }) => id !== orderId)]
  }
}

export default {
  fetch,
  searchList,
  clearSearch,
  fetchList,
  create,
  cancel,
  complete
}