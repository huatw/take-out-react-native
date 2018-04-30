const searchList = `

`

const fetch = `
  query ($id: ID!) {
    order (id: $id) {
      id
      quantity
      price
      status
      createtime
      finishtime
      address {
        full
      }
      orderFoods {
        quantity
        food {
          id
          name
          price
          thumbnail
        }
      }
      restaurant {
        id
        name
        thumbnail
      }
      rating {
        content
        stars
      }
    }
  }
`

const fetchList = `
  query {
    orders {
      id
      quantity
      price
      status
      createtime
      finishtime
      restaurant {
        name
      }
    }
  }
`

const create = `
  mutation ($foods: [ID]!, $quantities: [Int]!, $address: String!, $restaurantId: ID!) {
    createOrder (foods: $foods, quantities: $quantities, address: $address, restaurantId: $restaurantId) {
      id
      quantity
      price
      status
      createtime
      finishtime
      restaurant {
        name
      }
    }
  }
`

const cancel = `
  mutation ($orderId: ID!) {
    cancelOrder (orderId: $orderId) {
      id
      quantity
      price
      status
      createtime
      finishtime
      restaurant {
        name
      }
    }
  }
`

const complete = `
  mutation ($orderId: ID!, $content: String, $stars: Int) {
    completeOrder (orderId: $orderId, content: $content, stars: $stars) {
      id
      quantity
      price
      status
      createtime
      finishtime
      restaurant {
        name
      }
    }
  }
`

export default {
  fetch,
  searchList,
  fetchList,
  create,
  cancel,
  complete
}