const {
  GraphQLSchema,
} = require('graphql')

const RootQuery = require('graph/queries')
const RootMutation = require('graph/mutations')

const RootSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

module.exports = RootSchema