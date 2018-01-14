// NPM/Node deps
const { resolve } = require('path')
const express = require('express')
const graphqlHTTP = require('express-graphql')

/**
 * NODE_PATH=./
 */
// Our global utililites
const utils = require('utilities')
// our GraphQL entry
const RootSchema = require('graph/schema')
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
}

// Register GraphQL
app.use('/graphql', graphqlHTTP({
  schema: RootSchema,
  graphiql: true,
  // Let `resolve` methods have access
  // to the DB
  rootValue: {
    DB
  },
  // And pretty-print the JSON
  pretty: true
}))

// Serve static files from the `public` dir
app.use(express.static(resolve(__dirname, '..', 'public')))

// Start the server
app.listen(process.env.PORT, () => {
  // and let me know when it's started and where
  console.log('I am listening at http://localhost:%s', process.env.PORT)
})