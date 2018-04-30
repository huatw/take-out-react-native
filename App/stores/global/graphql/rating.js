const fetch = `
  query ($id: ID!) {
    restaurantRatings (id: $id) {
      id
      content
      createtime
      stars
    }
  }
`

export default {
  fetch
}