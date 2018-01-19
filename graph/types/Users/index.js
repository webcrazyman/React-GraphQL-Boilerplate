const UserType = `
type User {
  _id: String!
  firstName: String
  lastName: String
  comments: [Comment]
  posts: [Post]
}
`

module.exports = UserType