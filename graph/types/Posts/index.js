const postType = `
type Post {
  _id: String!
  title: String
  body: String
  author: User
  comments: [Comment]
}
`

module.exports = postType