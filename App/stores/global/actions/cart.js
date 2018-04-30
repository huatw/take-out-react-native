const init = (id) => ({ cart }) => {
  const initCart = {
    price: 0,
    quantity: 0,
    foods: {}
  }

  return {
    cart: {
      ...cart,
      [id]: initCart
    }
  }
}


const inc = (food, id) => ({ cart }) => {
  const oldCart = cart[id]
  const oldFood = oldCart.foods[food.id]
  const newFood = oldFood
    ? { food, quantity: oldFood.quantity + 1}
    : { food, quantity: 1 }

  const newCart = {
    price: oldCart.price + food.price,
    quantity: oldCart.quantity + 1,
    foods: {
      ...oldCart.foods,
      [food.id]: newFood
    }
  }

  return {
    cart: {
      ...cart,
      [id]: newCart
    }
  }
}

const dec = (food, id) => ({ cart }) => {
  const oldCart = cart[id]
  const oldFood = oldCart.foods[food.id]
  const newFood = { food, quantity: oldFood.quantity - 1}

  const newCart = {
    price: oldCart.price - food.price,
    quantity: oldCart.quantity - 1,
    foods: {
      ...oldCart.foods,
      [food.id]: newFood
    }
  }

  return {
    cart: {
      ...cart,
      [id]: newCart
    }
  }
}

export default {
  init,
  inc,
  dec
}