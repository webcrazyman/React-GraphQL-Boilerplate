const plugins = [
  'transform-class-properties',
  'transform-object-rest-spread',
]

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  plugins.push('react-hot-loader/babel')
}

module.exports = {
  presets: [
    ['env', {
      targets: {
        browsers: [
          '>40%',
          'last 2 versions'
        ]
      },
      loose: true,
      useBuiltIns: true,
      modules: process.env.NODE_ENV === 'test' ? undefined : false,
    }],
    'react'
  ],
  plugins,
}