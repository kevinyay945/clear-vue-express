// webpack.config.js
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: {
    'jsFile.js':'./src/index.js',
    'cssFile.css':'./src/sass/app.sass'
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
              loader: 'postcss-loader',
              options: {
                  plugins: function () {
                      return [
                          require('autoprefixer'),
                          require('cssnano')({preset: ['default', {discardComments: {removeAll: true}}]})
                      ];
                  }
              }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|woff|woff2|[ot]tf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './fonts/',
            publicPath: '../fonts/'
          }
        }
      },
      {
        test: /.*font.*\.svg$/,
        use: {
          loader: 'file-loader',
          options: {
              name: '[name].[ext]',
              outputPath: './fonts/',
              publicPath: '../fonts/'
          }
        }
      },
      {
        test: /^(?!.*font).*\.svg$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './images/',
            publicPath: '../images/'
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './images/',
            publicPath: '../images/'
          }
        }
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyCSS: true,
                minifyJS: true,
                sortAttributes: true,
                useShortDoctype: true
            },
            inject: false
        })
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  }
}
