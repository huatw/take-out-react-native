const add = (name, id) => ({ users }) => ({ users: [...users, { name, id }] })

const remove = (id) => ({ users }) => ({ users: users.filter(u => u.id !== id) })

const clear = () => ({ users: [] })

const toggleSelect = (id) => ({ users }) => ({
  users: users.map(u => u.id === id ? ({...u, selected: !u.selected}) : u)
})

export default {
  add,
  remove,
  clear,
  toggleSelect
}