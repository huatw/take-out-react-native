const fetch = `
  query ($id: ID!) {
    restaurant (id: $id) {
      id
      name
      cuisine
      description
      thumbnail
      createtime
      updatetime
      issaved
      nsaved
      avgrating
      avgprice
      address {
        full
      }
      foods {
        id
        name
        cuisine
        price
        thumbnail
      }
    }
  }
`

const fetchList = `
  query ($gps: [Float], $keyword: String, $type: Search!) {
    restaurants (gps: $gps, keyword: $keyword, type: $type) {
      id
      name
      cuisine
      thumbnail
      nsaved
      avgrating
      avgprice
    }
  }
`

const save = `
  mutation ($restaurantId: ID!) {
    saveRestaurant (restaurantId: $restaurantId) {
      id
      name
      cuisine
      description
      thumbnail
      createtime
      updatetime
      issaved
      nsaved
      avgrating
      avgprice
      address {
        full
      }
      foods {
        id
        name
        cuisine
        price
        thumbnail
      }
    }
  }
`

const unsave = `
  mutation ($restaurantId: ID!) {
    unsaveRestaurant (restaurantId: $restaurantId) {
      id
      name
      cuisine
      description
      thumbnail
      createtime
      updatetime
      issaved
      nsaved
      avgrating
      avgprice
      address {
        full
      }
      foods {
        id
        name
        cuisine
        price
        thumbnail
      }
    }
  }
`

export default {
  fetch,
  fetchList,
  save,
  unsave
}
