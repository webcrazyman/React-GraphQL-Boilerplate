const commentType = `
type Comment { 
  _id: String!
  body: String
  author: User
  post: Post
}
`

module.exports = commentType