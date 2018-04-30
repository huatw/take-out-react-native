const register = `
  mutation ($username: String!, $nickname: String!, $password: String!) {
    registerUser (username: $username, nickname: $nickname, password: $password) {
      username
      nickname
      createtime
      thumbnail
    }
  }
`

const update = `
  mutation ($nickname: String!, $password: String!) {
    updateUser (nickname: $nickname, password: $password) {
      username
      nickname
      createtime
      thumbnail
    }
  }
`

export default {
  register,
  update
}