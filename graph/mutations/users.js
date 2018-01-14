const { GraphQLNonNull } = require('graphql')
const { UserType } = require('graph/types/Users')
const { NewUserType } = require('graph/types/Users/inputs.js')

const newUser = {
  type: UserType,
  args: {
    input: {
      type: new GraphQLNonNull(NewUserType)
    }
  },
  resolve: ({ DB }, { input }) => {
    const saved = DB.save('users', input)

    return Promise.resolve(saved)
  }
}

module.exports = { newUser }