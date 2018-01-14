const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  })
})

module.exports = { UserType }