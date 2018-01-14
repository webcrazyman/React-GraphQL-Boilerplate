const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const context = path.resolve(__dirname, '..')
const ENTRY_DIR = path.join(context, 'client')
const BUILD_DIR = path.join(context, 'public')
const CONFIG_DIR = path.join(context, 'config')

module.exports = {
  context,
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.resolve(ENTRY_DIR, 'entry.js')
  },
  output: {
    path: BUILD_DIR,
    filename: 'assets/js/[name].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.png', '.jpg', '.jpeg', '.gif'],
    modules: [
      'node_modules',
      'shared'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __API__: JSON.stringify('http://localhost:5001/graphql')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/js/vendor.[chunkhash].js',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') >= 0;
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(CONFIG_DIR, 'index.template.html'),
      path: BUILD_DIR,
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: 'all',
      fileBlacklist: [/\.(css|map)$/, /base?.+/]
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[contenthash].css',
      allChunks: true
    }),
    new StyleExtHtmlWebpackPlugin({
      minify: true
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: require(path.join(CONFIG_DIR, 'babel.front.js'))
          }
        ],
        include: ENTRY_DIR
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: require(path.join(CONFIG_DIR, 'postcss.config.js'))
            }
          ]
        })
      },
      {
        test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/misc/[name].[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20480,
              name: 'assets/img/[name].[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
}