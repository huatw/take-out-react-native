import { addressAPI } from '../graphql'

const update = async ([longitude, latitude]) => {
  // const { address } = await addressAPI.fetch({ longitude, latitude })
  // return { address }

  // fake data
  return { address: { full: 'howe center ..', gps: [longitude, latitude] } }
}

export default {
  update,
}