const fetch = `
  query ($longitude: Float!, $latitude: Float!) {
    address (longitude: $longitude, latitude: $latitude) {
      state
      city
      street
      full
      gps
    }
  }
`

export default {
  fetch
}
