import { addressAPI } from '../graphql'

const update = async (longitude, latitude) => {
  if (longitude === undefined || latitude === undefined) {
    return { address: { gps: [] } }
  }

  const { address } = await addressAPI.fetch({ longitude, latitude })
  return { address }
}

export default {
  update
}
