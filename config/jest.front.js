const { resolve } = require('path')
const CONFIG_DIR = resolve(__dirname)

module.exports = {
  rootDir: resolve(__dirname, '..', 'client'),
  setupTestFrameworkScriptFile: resolve(CONFIG_DIR, 'jest.init.js'),
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: [
    "js"
  ],
  moduleDirectories: [
    "node_modules",
    'shared'
  ]
}