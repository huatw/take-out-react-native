import { GRAPHQL_URL } from '../config'

const fetchGraphql = async (query, variables) => {
  const response = await fetch(GRAPHQL_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })

  const { data, errors } = await response.json()

  if (errors) {
    throw Error(errors[0].message || 'No Message Provided.')
  }

  return data
}

export default fetchGraphql
