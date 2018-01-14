const withDefaults = (defaults, obj) => Object.assign({}, defaults, obj)

const isProduction = () => process.env.NODE_ENV === 'production'

const registerGlobalHandlers = (opts = {}) => {
  const config = withDefaults({}, opts)

  process.on('unhandledRejection', (reason, place) => {
    console.info('There is an unhandled rejection!: ', reason)
    console.warn('Right here: ', place)
  })
}

module.exports = {
  isProduction,
  registerGlobalHandlers,
  withDefaults
}