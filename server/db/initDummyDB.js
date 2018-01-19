const fs = require('fs')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)

const faker = require('faker')

const DB_PATH = process.argv[2] || __dirname + '/dummy.json'

const makeUser = (opts = {}) => Object.assign({}, {
  _id: faker.random.uuid(),
  profile: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    job: {
      type: faker.name.jobType(),
      area: faker.name.jobArea(),
    },
    email: faker.internet.email(),
    website: faker.internet.url(),
    avatar: faker.internet.avatar(),
  },
  password: faker.internet.password(),
}, opts)

const makePost = opts => Object.assign({}, {
  _id: faker.random.uuid(),
  title: faker.lorem.sentences(1),
  tags: faker.lorem.words(faker.random.number({ min: 0, max: 10 })),
  body: faker.lorem.paragraphs(faker.random.number({ min: 2, max: 100 })),
}, opts)

const makeComment = opts => Object.assign({}, {
  _id: faker.random.uuid(),
  body: faker.lorem.paragraphs(faker.random.number({ min: 1, max: 10 })),
}, opts)

const makeList = (amount, fn) => '*'.repeat(amount).split('').map(fn)

const users = makeList(100, makeUser)
const posts = makeList(500, makePost)
const comments = makeList(10000, makeComment)

const getRandom = list => list[faker.random.number({ min: 0, max: list.length - 1 || 0 })]

const assignTo = (from, to, type) => {
  const attachTo = getRandom(to)
  if (!attachTo[type]) {
    attachTo[type] = from.id
  } else {
    assignTo(from, to, type)
  }
}

const forL = (fn, length, ...args) => {
  for (let i = 0; i < length; i++) {
    fn(...args)
  }
}

// Assign authors to posts and comments
users.forEach(user => {
  const amountOfPosts = faker.random.number({ min: 0, max: 50 })
  const amountOfComments = faker.random.number({ min: 0, max: 500 })

  forL(() => {
    const post = getRandom(posts)
    if (!user.posts) {
      user.posts = []
    }

    post.author = user._id
    user.posts.push(post._id)
  }, amountOfPosts)
  forL(() => {
    const comment = getRandom(comments)
    if (!user.comments) {
      user.comments = []
    }

    comment.author = user._id
    user.comments.push(comment._id)
  }, amountOfComments)
})


// Assign comments to posts
comments.forEach(comment => {
  const post = getRandom(posts)

  if (!post.comments) {
    post.comments = []
  }

  post.comments.push(comment)
  comment.post = post._id
})


writeFile(DB_PATH, JSON.stringify({
  users,
  posts,
  comments
}, null, 2))