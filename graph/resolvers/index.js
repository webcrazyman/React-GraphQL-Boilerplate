const isID = root => typeof root === 'string'

module.exports = {
  Query: {
    posts: (root, args, context, info) => {
      const { db } = context
      return Promise.resolve(db.get('posts').slice(0, 10))
    },
    users: (root, args, context, info) => {
      const { db } = context

      return Promise.resolve(db.get('users').slice(0, 10))
    }
  },
  Mutation: {
  },
  User: {
    firstName: async (root, args, context, info) => {
      const user = !isID(root) ? root : await context.db.users.load(root)

      return user.profile.firstName
    },
    lastName: async (root, args, context, info) => {
      const user = !isID(root) ? root : await context.db.users.load(root)
      return user.profile.lastName
    },
    posts: async (root, args, context, info) => {
      const user = !isID(root) ? root : await context.db.users.load(root)
      return user.posts
    },
    comments: async (root, args, context, info) => {
      const user = !isID(root) ? root : await context.db.users.load(root)
      return user.comments
    }
  },
  Post: {
    _id: root => isID(root) ? root : root._id,
    comments: async (root, args, context, info) => {
      const post = !isID(root) ? root : await context.db.posts.load(root)
      return post.comments
    },
    title: async (root, args, context, info) => {
      const post = !isID(root) ? root : await context.db.posts.load(root)

      return post.title
    },
    body: async (root, args, context, info) => {
      const post = !isID(root) ? root : await context.db.posts.load(root)

      return post.body
    }
  },
  Comment: {
    _id: root => isID(root) ? root : root._id,
    post: async (root, args, context, info) => {
      const comment = !isID(root) ? root : await context.db.comments.load(root)

      return comment.post
    }
  },
}