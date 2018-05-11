const fetch = `
  query ($id: ID!) {
    food (id: $id) {
      id
      name
      cuisine
      description
      available
      price
      thumbnail
      createtime
      restaurant {
        id
        name
        thumbnail
      }
    }
  }
`

export default {
  fetch
}
