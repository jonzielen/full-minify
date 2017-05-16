const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "[name].css"
});

const config = [{
  entry: {
    main: [
      './css/src/main.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'css/dist'),
    filename: '[name].css'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.scss$/,
      loader: extractSass.extract({
        use: [{
          loader: "css-loader",
          options: {
            sourceMap: true,
            minimize: true
          }
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }, {
      test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
      use: [{
        loader: "file-loader"
      }]
    }]
  },
  plugins: [
    extractSass
  ]
},{
  entry: {
    main: [
      './js/src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'js/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        comments: false
    })
  ]
}, {
  entry: {
    main: [
      './index.html'
    ]
  },
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'index.min.html'
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true
          }
        }]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "index.min.html"
    })
  ]
}];

module.exports = config;
