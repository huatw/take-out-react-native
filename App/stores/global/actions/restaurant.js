import { restaurantAPI } from '../graphql'

const fetch = async (id) => {
  const { restaurant } = await restaurantAPI.fetch({ id })

  return { restaurant }
}

const clearList = (type) => ({ restaurants }) => {
  const stateName = type.toLowerCase()

  return {
    restaurants: {
      ...restaurants,
      [stateName]: []
    }
  }
}

const fetchList = (type, keyword) => async ({ restaurants, address: { gps } }) => {
  const stateName = type.toLowerCase()
  const data = await restaurantAPI.fetchList({ keyword, gps, type })

  return {
    restaurants: {
      ...restaurants,
      [stateName]: data.restaurants
    }
  }
}

const save = (restaurantId) => async ({ restaurants }) => {
  const { saveRestaurant: newSaved } = await restaurantAPI.save({ restaurantId })

  return {
    restaurant: newSaved,
    restaurants: {
      ...restaurants,
      saved: [newSaved, ...restaurants.saved]
    }
  }
}

const unsave = (restaurantId) => async ({ restaurants }) => {
  const { unsaveRestaurant: newUnsaved } = await restaurantAPI.unsave({ restaurantId })

  return {
    restaurant: newUnsaved,
    restaurants: {
      ...restaurants,
      saved: restaurants.saved.filter(({ id }) => id !== restaurantId)
    }
  }
}

export default {
  fetch,
  clearList,
  fetchList,
  unsave,
  save
}
