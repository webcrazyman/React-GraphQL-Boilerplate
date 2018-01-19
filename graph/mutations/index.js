const userMutations = require('./users')

const mutations = `
  type Mutation {
    hello: String
    ${userMutations}
  }
`

module.exports = mutations