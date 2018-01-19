## Queries

Queries are similar to `GET` requests in HTTP. We create different query names, arguments, and return type, and the client can request information using those names. Let's see what I mean.

We just added a `Post` and `Tag` type to our system so lets create some `queries` for those types, synonymous with `GET /posts` or `GET /tags`

First, we create the file for the `posts` queries: `graph/queries/posts.js` and create the `[queryName]: ReturnType` if the query does not take arguments or `[queryName](arg: Type): Type`. 

Knowing that, the `posts.js` file should look something like this:

```js
const postQueries = `
 post(id: String!): Post
 posts: [Post]
`

module.exports = postQueries
```

We created a `post` query that must be given the argument `id` that must be a `String` and it will eventually resolve into a `Post` type. The same `type` that we created in the previous step.

Now we need to createa  resolver for these queries. And we do that inside of `methods.js`