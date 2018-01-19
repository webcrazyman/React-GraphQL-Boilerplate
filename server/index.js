// NPM/Node deps
const { resolve } = require('path')
const express = require('express')
const helmet = require('helmet')
const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
/**
 * NODE_PATH=./
 */
// Our global utililites
const utils = require('utilities')
// our GraphQL entry
const { schema, resolvers } = require('graph')
// Some DB
const DB = require('./db')

// Any global handlers that this application needs
utils.registerGlobalHandlers()

// Our Express instance
const app = express()

// If we are not in production
if (!utils.isProduction()) {
  // I want to set some stuff up
  require('dotenv').config()

  // And add some middleware to make life easier
  app.use(require('cors')())
  app.use(require('morgan')('dev'))
} else {
  app.use(helmet())
}

// Register GraphQL
app.use('/graphql', graphqlHTTP({
  schema: makeExecutableSchema({
    typeDefs: schema,
    resolvers
  }),
  graphiql: true,
  context: {
    db: DB
  },
  // And pretty-print the JSON
  pretty: true
}))

const PUBLIC_DIR = resolve(__dirname, '..', 'public')

// Serve static files from the `public` dir
app.use(express.static(PUBLIC_DIR))

// Resolve all other requests that I have not
// handled above with index.html
app.get('*', function (request, response) {
  response.sendFile(resolve(PUBLIC_DIR, 'index.html'))
})

// Start the server
app.listen(process.env.PORT, () => {
  // and let me know when it's started and where
  console.log('I am listening at http://localhost:%s', process.env.PORT)
})