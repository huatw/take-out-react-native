import userActions from './user'

const delay = ms => new Promise(res => setTimeout(res, ms))

const photoActions = {
  add: (owner, id) => ({ photos }) => ({ photos: [...photos, { owner, id }] }),
  remove: (id) => ({ photos }) => ({ photos: photos.filter(p => p.id !== id) }),
  clear: () => ({ photos: [] }),
  delayRemove: (id) => async ({ photos }) => {
    await delay(1000)
    return { photos: photos.filter(p => p.id !== id) }
  }
}

const actions = {
  userActions,
  photoActions
}

export default actions
