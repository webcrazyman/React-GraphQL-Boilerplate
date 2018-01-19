const comment = opts => (...args) => {
  console.log('requesting a comment!')
  console.log(args)
  return Promise.resolve({ _id: '123' })
}

const user = opts => (input, request, context) => {
  console.log('Hello!')
  return Promise.resolve({ _id: '123', name: 'John' })
}

const users = opts => (input, request, context) => {
  console.log('From users!')
  return Promise.resolve([{ _id: '123', name: 'John' }])
}

const post = ({ db }) => ({ id }) => {
  const found = db.get('posts', id)
  // Hack due to bad dummyJSON
  found.tags = Array.isArray(found.tags) ? found.tags : [found.tags]
  if (found._id) {
    return Promise.resolve(found)
  } else {
    return Promise.resolve(null)
  }
}

module.exports = opts => ({
  User: user(opts),
  user: user(opts),
  users: users(opts),
  Post: post(opts),
  post: post(opts),
  Comment: comment(opts),
  comment: comment(opts),
})