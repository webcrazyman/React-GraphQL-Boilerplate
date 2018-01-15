# GraphQL SPA Boilerplate

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/mck-p/graphql-spa-boilerplate.svg?branch=master)](https://travis-ci.org/mck-p/graphql-spa-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/mck-p/graphql-spa-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/mck-p/graphql-spa-boilerplate?branch=master)

## Overview

This is the McKendrie-Phillips' 2018 GraphQL SPA boilerplate. Out of the box support for `build` and `production` scripts. 

## Usage

```
$ git clone git@github.com:mck-p/graphql-spa-boilerplate.git

$ cd graphl-spa-boilerplate

$ yarn

$ yarn start
```

To start as a fresh `git` repository, run the following commands:

```
$ rm -rf .git

$ git init
```

This will create a new `git` tree and allow you to add your own repo as the base.

## Development

```
$ yarn dev // Server and Client

$ yarn dev:f // Client only

$ yarn dev:s // Server only
```

## Tools

**Main Tools**
* [React](https://reactjs.org/)
  - View Layer
* [Material UI](https://material-ui-next.com/)
  - Material Design components
* [GraphQL](http://graphql.org/)
  - API Layer
* [Express](https://expressjs.com/)
  - Static / API Server
* [PM2](https://github.com/Unitech/pm2)
  - Cluster management for production Node applications

**Build | Dev Tools**
* [Webpack](https://webpack.js.org/)
  - Bundling/Building
* [Babel](https://babeljs.io/)
  - Use ES6+ features now
* [Prettier-Standard](https://github.com/sheerun/prettier-standard)
  - Code formatting without the hassle
* [Husky](https://github.com/typicode/husky)
  - Run commands on `git` hooks
* [Lint-Staged](https://github.com/okonet/lint-staged)
  - Run commands before allowing `git` hooks
* [Jest](https://facebook.github.io/jest/)
  - Test both Server/Client code
* [Travis CI](https://travis-ci.org/)
  - Basic TravisCI support. Depends on you setting up your repo for it
* [Graphiql](https://github.com/graphql/graphiql)
  - For exploring and building GraphQL APIs

## Script Overview

### yarn clean

Removes `public` folder.

### yarn start:prod

Starts a production server based on the config file `config/pm2.config.prod.yml`

### yarn start:stage

Starts a staging server based on the config file `config/pm2.config.stage.yml`

### yarn start

Runs `yarn clean`, `yarn build`, and `yarn start:prod`. This is for running at deployment.

### yarn dev:s

Starts an `express` server, using `config/.env.server` for `process.env` values.

### yarn dev:f

Starts `webpack-dev-server` at `http://localhost:5001`. Hot-module replacement, et al should be working. Any updates to `client/` should be reflected in the browser.

### yarn dev

Runs `yarn dev:f` and `yarn dev:s` concurrently. 

### yarn build:f

Builds the Client codebase for static distribution via `public`. Should be all minimized and gzipped and all that jazz.

### yarn test:f

Runs tests for front end, with an OS notification when done about results.

### yarn:f:w

Runs a test watcher, running tests for all files that have changed since last `git commit`.

### yarn:s

Does nothing right now, should run tests for server side code.

### yarn coverage:f

Gathers coverage for `client` side code.

### yarn coverage:s

Gathers coverage for `server` side code.

### yarn coverage

Run `yarn coverage:f` and `yarn coverage:s`

### yarn format:f

Formats the `client` code via `standard-prettier`

### yarn format:s

Formats the `server` code via `standard-prettiers`

### yarn format

Runs `yarn format:f`

### yarn precommit

This is ran on `git commit` and runs `format:f`

### yarn prepush

This is ran on `git push` and runs `test`


## Integrations

There is a `.travis.yml` file that is set up to run tests on node `8`, `7`, and `6`. You will have to set up your `github` repo to have the `Travis CI` integration for it to work. 

## Folder Overview

```
|./ <-- Root
 --
  | client/ <-- React/View layer files
  | config/ <-- Config files
  | graph/ <-- GraphQL files
  | public/ <-- Static Server files
  | server/ <-- Server files
  | utilities/ <-- Global Utility files
```

### client

This project uses `react`, et al for the view layer but it can be easily replaced by changing the configs inside of `configs/webpack.dev` and `configs/babel.front`.

### config

Folder for general configruation files

### graph

```
| ./graph/ <-- Root
 --
  | mutations/ <-- GraphQL Mutations by key
  | queries/ <-- GraphQL queries by key
  | schema/ <-- Main export for GraphQLHTTP middleware
  | types/ <-- GraphQL Types
```

### public

Files are server from this folder structure, with `index.html` being `/` and all folders being publicly available. `yarn build` should point to this directory as its output.

### server

A place to connect the Database to GraphQL, along with serving static files ( Front-End ) and adding the Schema to `express`.

## Setting Up Travis CI

1. Go to [`Travis CI`](https://travis-ci.org/) and sign in.
2. Hover over your icon and click `Accounts` or go to `http://travis-ci.org/profile/[username].
3. Find the repo that you are wanting to connect `Travis` to. If you do not see it, try `Sync Accounts`. If you are using an `organization` repo, there are extra steps.
4. Click the `x` icon next to the repo that you want to add Travis to.
5. In the Github repo, go to `Settings`, and click `Integrations` then add one and click/type `Travis`.
6. Create a new PR and push to the selected repo with a `travis.yml` file.
    - If you mess up, try editing a file and pushing to the PR branch.
7. Now in the PR, you should see a `Pending` status for `Travis CI`. It will tell you what happens on Travis.
8. If you want to add a rule where you cannot merge unless..., you can go `Branches`, from `Settings` in Github. Add the branch you want rules on with `choose branch`. Add rules/integrations.

## Setting Up Coveralls

1. Go to [`Coveralls`](https://coveralls.io)
2. Sign in
3. Click `Add Repo`.
4. Follow similar setup to `Travis CI`.
5. Ensure that you have the correct path set for `coverageDirectory` and that that directory is created due to permission issues on different OS's.
6. Create new PR.
7. You should see that `Coveralls` is commenting on the PR just like `Travis CI` is.
8. Follow the directions for `Travis CI` to add `Coveralls` checks to branch merges.
