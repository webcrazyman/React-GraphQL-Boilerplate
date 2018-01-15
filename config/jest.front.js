const { resolve } = require('path')
const CONFIG_DIR = resolve(__dirname)

module.exports = {
  rootDir: resolve(__dirname, '..', 'client'),
  setupTestFrameworkScriptFile: resolve(CONFIG_DIR, 'jest.init.js'),
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: [
    "js",
    "css",
    "jpeg",
    "jpg",
    "gif",
    "woff",
    "svg",
    "png"
  ],
  moduleDirectories: [
    "node_modules",
    'shared'
  ],
  collectCoverageFrom: [
    '**/*.js'
  ],
  coverageDirectory: resolve(__dirname, '..', 'coverage'),
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  browser: true
}