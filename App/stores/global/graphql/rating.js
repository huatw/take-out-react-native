const fetchByRestaurant = `
  query ($id: ID!) {
    restaurantRatings (id: $id) {
      id
      nickname
      content
      createtime
      stars
    }
  }
`

export default {
  fetchByRestaurant
}