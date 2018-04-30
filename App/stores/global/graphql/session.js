const fetch = `
  query {
    session {
      username
      nickname
      createtime
      thumbnail
    }
  }
`

const login = `
  mutation ($username: String!, $password: String!) {
    login (username: $username, password: $password) {
      username
      nickname
      createtime
      thumbnail
    }
  }
`
const logout = `
  mutation {
    logout
  }
`

export default {
  fetch,
  login,
  logout
}