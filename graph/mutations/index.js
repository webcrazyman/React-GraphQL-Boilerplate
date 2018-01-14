const { GraphQLString, GraphQLObjectType } = require('graphql')
const UserMutations = require('./users')

const mutation = new GraphQLObjectType({
  name: 'RootMutationsType',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve() {
        return 'world'
      }
    },
    ...UserMutations
  })
})

module.exports = mutation