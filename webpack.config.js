require('./node_modules/coffee-script/register')
const webpack = require('webpack')

const branch = process.env.TRAVIS_BRANCH

if (branch === 'master') process.env.ENV = 'PROD'
if (branch === 'dev')    process.env.ENV = 'DEV'
if (branch === 'qa')     process.env.ENV = 'QA'

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: ['babel-polyfill', './src/index']
  },
  template: './src/index.html'
})

// Set asset prefix to CDN
config.output.publicPath = 'd2w5g0u9h79yyx.cloudfront.net'

// import X from Y added to files when using these globals
config.plugins.push(new webpack.ProvidePlugin({
  React: 'react'
}))

// Adding react hot loader
const babelOptions = {
  presets: [ 'es2015', 'react', 'stage-2' ],
  plugins: [ 'lodash' ]
}

const jsxLoader = {
  test: /\.(js|jsx)$/,
  loaders: [
    'react-hot',
    'babel?' + JSON.stringify(babelOptions)
  ],
  exclude: /node_modules\/(?!appirio-tech.*)/
}

// Loop over loaders and replace
config.module.loaders.forEach((loader, i, loaders) => {
  if (loader.loader === 'babel' && String(loader.test) === String(/\.(js|jsx)$/)) {
    jsxLoader.include = loader.include
    loaders[i] = jsxLoader
  }
})

module.exports = config
