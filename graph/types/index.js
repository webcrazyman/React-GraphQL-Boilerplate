const UserType = require('./Users')
const UserInputs = require('./Users/inputs')
const PostType = require('./Posts')
const CommentType = require('./Comments')

const types = `
  ${UserType}

  ${UserInputs}

  ${PostType}

  ${CommentType}
`

module.exports = types