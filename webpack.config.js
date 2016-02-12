require('./node_modules/coffee-script/register')
const webpack = require('webpack')

if (process.env.TRAVIS_BRANCH == 'master') process.env.ENV = 'PROD'
if (process.env.TRAVIS_BRANCH == 'dev') process.env.ENV = 'DEV'
if (process.env.TRAVIS_BRANCH == 'qa') process.env.ENV = 'QA'

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.html'
})

// Add ProvidePlugin
config.plugins.push(new webpack.ProvidePlugin({
  'React': 'react'
}))


// Adding react hot loader
const jsxLoader = {
  test: /\.jsx?$/,
  loaders: [
    'react-hot',
    'babel?' + JSON.stringify( {presets: ['es2015', 'react']} )
  ],
  exclude: /node_modules\/(?!appirio-tech.*)/
}

// Loop over loaders and replace
config.module.loaders.forEach((loader, i, loaders) => {
  if (loader.loader === 'babel' && String(loader.test) === String(/\.jsx?$/)) {
    jsxLoader.include = loader.include
    loaders[i] = jsxLoader
  }
})

module.exports = config
