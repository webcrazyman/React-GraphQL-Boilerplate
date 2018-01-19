const { v4: uuid } = require('uuid')
const data = require('./dummy.json')
const DataLoader = require('dataloader')

const db = {
  get: (key, id) => id
    ? Object.assign({}, data[key].find(({ _id }) => id === _id))
    : [...data[key]],
  batchGet: (key, ids) => data[key].filter(({ _id }) => ids.indexOf(_id) > -1),
  save: (key, data) => {
    const _id = uuid()
    const withID = Object.assign({}, data, { _id })
    data[key].push(withID)

    return withID
  },
  delete: (key, id) => data[key] = data[key].filter(({ _id }) => id !== _id)
}
const loaders = {
  users: new DataLoader(async ids => await db.batchGet('users', ids)),
  posts: new DataLoader(async ids => await db.batchGet('posts', ids)),
  comments: new DataLoader(async ids => await db.batchGet('comments', ids))
}

module.exports = Object.assign(db, loaders)