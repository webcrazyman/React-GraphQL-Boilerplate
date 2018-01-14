const { GraphQLString, GraphQLObjectType } = require('graphql')
const UserQueries = require('./users')

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve() {
        return 'world'
      }
    },
    ...UserQueries
  })
})

module.exports = query