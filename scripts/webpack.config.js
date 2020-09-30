const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const { proxy, getIndex } = require('./proxy')

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
  target: 'web',
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
    new CleanWebpackPlugin(),
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
    openPage: 'config',
    writeToDisk: true,
    before (app, server, compiler) {
      app.get('/config', (req, res) => {
        res.sendFile(path.join(staticPath, 'config.html'))
      })
      app.get('/ncov/wap/default/index', async (req, res) => {
        let data = await getIndex()
        data = data
          .replace('var vm', 'Vue.config.devtools = true;__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = Vue; var vm')
          .replace(/<\/head>/gm, '<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"></head>')
          .replace(/<\/body>/gm, '<script src="https://unpkg.com/element-ui/lib/index.js"></script><script src="/index.js"></script></body>')
        res.send(data)
      })
    },
  },
  watch: true
}

module.exports = config
