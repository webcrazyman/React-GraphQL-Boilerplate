const RootQuery = require('graph/queries')
const RootMutation = require('graph/mutations')
const Types = require('graph/types')

const RootSchema = `
${RootQuery}

${RootMutation}

${Types}

schema {
  query: Query
  mutation: Mutation
}
`

module.exports = RootSchema