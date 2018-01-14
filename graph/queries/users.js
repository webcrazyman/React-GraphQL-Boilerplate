const { GraphQLString, GraphQLList } = require('graphql')

const { UserType } = require('graph/types/Users')

const userQuery = {
  type: UserType,
  args: {
    _id: {
      type: GraphQLString
    }
  },
  resolve: (root, args) => {
    console.log(args, 'args')
    return new Promise((res, rej) => {
      try {
        const result = root.DB.get('users', args._id)
        res(result)
      } catch (e) { rej(e) }
    })
  }
}

const usersQuery = {
  type: new GraphQLList(UserType),
  resolve: (root) => {
    return Promise.resolve(root.DB.get('users'))
  }
}

module.exports = {
  user: userQuery,
  users: usersQuery
}