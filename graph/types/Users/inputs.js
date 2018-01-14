const { GraphQLInputObjectType, GraphQLString } = require('graphql')

const NewUserType = new GraphQLInputObjectType({
  name: 'NewUser',
  fields: () => ({
    name: {
      type: GraphQLString
    }
  })
})

module.exports = { NewUserType }