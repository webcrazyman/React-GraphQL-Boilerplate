// To handle file paths
const { resolve, join } = require('path')

// Webpack Plugin Stuff
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

// Where we are resolving from
const context = resolve(__dirname, '..')

// Where we are building to
const PUBLIC_DIR = join(context, 'public')

// Where the Client folder is
const ENTRY_DIR = join(context, 'client')
// Where the Config folder is
const CONFIG_DIR = join(context, 'config')

// 
const entry = {
  app: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:5001',
    join(ENTRY_DIR, 'entry.js')
  ]
}

const output = {
  filename: 'assets/js/[name].[hash].js',
  path: PUBLIC_DIR,
  publicPath: '/'
}

const devServer = {
  port: 5001,
  host: 'localhost',
  hot: true,
  inline: true,
  historyApiFallback: true,
  contentBase: PUBLIC_DIR,
}

const devtool = 'inline-source-map'

const JS_LOADERS = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: require(join(CONFIG_DIR, 'babel.front.js'))
    }
  ]
}

const CSS_LOADERS = {
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true
      }
    },
    {
      loader: 'postcss-loader',
      options: require(join(CONFIG_DIR, 'postcss.config.js'))
    }
  ]
}

const IMAGE_LOADERS = {
  test: /\.(png|jpg|jpeg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    }
  ]
}

const FONT_LOADERS = {
  test: /\.(ttf|eot|woff|woff2)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]',
      },
    }
  ]
}

const SVG_LOADERS = {
  test: /\.svg$/,
  use: [
    {
      loader: 'svg-inline-loader',
      options: {
        idPrefix: true,
        classPrefix: true,
      }
    }
  ]
}

const rules = [
  JS_LOADERS,
  CSS_LOADERS,
  IMAGE_LOADERS,
  FONT_LOADERS,
  SVG_LOADERS,
]

const mod = { rules }

const extensions = ['.js', '.json', '.css', '.png', '.jpg', '.jpeg', '.gif']
const modules = ['node_modules', 'shared']
const res = { modules, extensions }

const plugins = [
  // Handle all those nasty imports for us
  new HtmlPlugin({
    template: join(CONFIG_DIR, 'index.template.html'),
    inject: true
  }),
  // Don't say you worked when there was errors
  new webpack.NoEmitOnErrorsPlugin(),
  // Enable Hot MOdule Replacement
  new webpack.HotModuleReplacementPlugin(),
  // Define some globals
  new webpack.DefinePlugin({
    __API__: JSON.stringify('http://localhost:5000/graphql')
  }),
  // Create a `vendor` resource for any
  // module I import from `node_modules`
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: ({ resource }) => /node_modules/.test(resource),
  }),
  // Do some Favicon stuff so I don't have to
  new FaviconsWebpackPlugin(join(ENTRY_DIR, 'shared', '_img', 'logo.jpg')),
  new webpack.NamedModulesPlugin()
]

const config = {
  context,
  entry,
  output,
  devtool,
  devServer,
  plugins,
  module: mod,
  resolve: res
}

module.exports = config