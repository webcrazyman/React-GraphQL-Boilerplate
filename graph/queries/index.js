const userQueries = require('./users')
const postQueries = require('./posts')
const commentQueries = require('./comments')

const query = `
type Query {
  hello: String
  ${userQueries}
  ${postQueries}
  ${commentQueries}
}
`

module.exports = query