import { addressAPI } from '../graphql'

const update = async (gps) => {
  // const { address } = await addressAPI.fetch(gps)
  // return { address }

  // fake data
  return { address: { full: 'new york ..', gps } }
}

export default {
  update,
}