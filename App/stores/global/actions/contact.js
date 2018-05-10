const init = (restaurantId) => ({ contacts }) => {
  return {
    contacts: {
      ...contacts,
      [restaurantId]: contacts[restaurantId] || []
    }
  }
}

const sendMessage = (messages, restaurantId) => ({ contacts }) => {
  return {
    contacts: {
      ...contacts,
      [restaurantId]: messages
    }
  }
}

export default {
  init,
  sendMessage
}