const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { proxy } = require('./proxy')

const rootPath = path.resolve(__dirname, '..')
const srcPath = path.join(rootPath, 'src')
const staticPath = path.join(rootPath, 'public')
const buildPath = path.join(rootPath, 'build')
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  context: rootPath,
  mode: 'development',
  entry: {
    index: path.join(srcPath, 'index.js')
  },
  output: {
    path: buildPath,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(staticPath, 'index.html'),
      filename: 'ncov/wap/default/index'
    }),
    new HtmlWebpackPlugin({
      template: path.join(staticPath, 'config.html'),
      filename: 'config'
    })
  ],
  devtool: 'inline-source-map',
  externals: {
    vue: 'Vue',
    $: 'jQuery'
  },
  resolve: {
    alias: {
      '@utils': path.join(srcPath, 'utils'),
      '@components': path.join(srcPath, 'components')
    },
    extensions: ['.js', '.vue']
  },
  devServer: {
    contentBase: buildPath,
    hot: true,
    host: '0.0.0.0',
    port: 7000,
    https: true,
    proxy,
    open: true,
    openPage: 'ncov/wap/default/index'
  },
  watch: true
}

module.exports = config