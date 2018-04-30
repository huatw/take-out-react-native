import { ratingAPI } from '../graphql'

const fetchByRestaurant = (id) => async ({ restaurant }) => {
  const { restaurantRatings: ratings } = await ratingAPI.fetchByRestaurant({ id })

  return {
    restaurant: {
      ...restaurant,
      ratings
    }
  }
}

// const fetchByUser = async () => {}

// const create = (rating, restaurantId) => async (state) => {
//   const ratings = [rating, ...state.ratings]
//
//   return { ratings }
// }
//
// // todo
// const remove = (ratingId) => async (state) => {
//   const ratings = state.ratings.filter(({ _id }) => _id !== ratingId)
//
//   return { ratings }
// }

export default {
  fetchByRestaurant
}