import { sessionAPI } from '../graphql'

/**
 * try fetch session
 * @return {Object} patch to merge to global state
 */
const fetch = async () => {
  try {
    const { session } = await sessionAPI.fetch()
    return { session }
  } catch (e) {
    return { session: {} }
  }
}

const login = async (username, password) => {
  const { login: session } = await sessionAPI.login({ username, password })

  return { session }
}

const logout = async () => {
  await sessionAPI.logout()

  return { session: {} }
}

export default {
  fetch,
  login,
  logout,
}