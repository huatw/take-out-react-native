import { foodAPI } from '../graphql'

const fetch = async (id) => {
  const { food } = await foodAPI.fetch({ id })

  return { food }
}

export default {
  fetch
}
