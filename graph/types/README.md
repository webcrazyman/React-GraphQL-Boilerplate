## Types

Everything in `graphql` is typed. But since we don't like importing things and all of that jazz, we are using the GraphQL spec language itself. To see how we do that, let's start with adding a `Post` type to this folder that matches what `dummyDB` holds:

_**graph/types/Posts/index.js**_

```js
const postType = `
type Post {
  _id: String!
  title: String
  tags: [String]
  body: String
}
`

module.exports = postType
```

Now that we have our type defined, we need to tell our system about it. We do that via: `graph/types/index.js`:

```js
// other imports
const PostType = require('./Posts')

const types = `
// Other types

${PostType}
`

// ... rest of code
```

Now the rest of our system should know about the type and be able to use it.