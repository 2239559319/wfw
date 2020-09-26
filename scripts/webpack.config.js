const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']],
              plugins: [
                [
                  'component',
                  {
                    libraryName: 'element-ui',
                    styleLibraryName: 'theme-chalk'
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(staticPath, 'index.html'),
      filename: 'ncov/wap/default/index'
    }),
    new HtmlWebpackPlugin({
      template: path.join(staticPath, 'config.html'),
      filename: 'config'
    })
  ],
  devtool: 'source-map',
  externals: {
    vue: 'Vue',
    'element-ui': 'Element'
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
    openPage: 'config'
  },
  watch: true
}

module.exports = config
