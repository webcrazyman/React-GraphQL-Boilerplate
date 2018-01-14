const { v4: uuid } = require('uuid')

const DUMMY_DATA_BASE = {
  users: [
    {
      name: 'John',
      _id: '2'
    }
  ],
  posts: [
    {
      title: 'Other',
      _id: '1'
    }
  ]
}

module.exports = {
  get: (key, id) => id
    ? Object.assign({}, DUMMY_DATA_BASE[key].find(({ _id }) => id === _id))
    : [...DUMMY_DATA_BASE[key]],
  save: (key, data) => {
    const _id = uuid()
    const withID = Object.assign({}, data, { _id })
    DUMMY_DATA_BASE[key].push(withID)

    return withID
  },
  delete: (key, id) => DUMMY_DATA_BASE[key] = DUMMY_DATA_BASE[key].filter(({ _id }) => id !== _id)
}