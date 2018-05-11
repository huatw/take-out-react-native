import { userAPI } from '../graphql'

const register = async (username, nickname, password) => {
  const { registerUser: session } = await userAPI.register({ username, nickname, password })
  return { session }
}

const update = async ({ nickname = '', password = '' }) => {
  const { updateUser: session } = await userAPI.update({ nickname, password })

  return { session }
}

export default {
  register,
  update
}
