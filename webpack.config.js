const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');

const extractSass = new ExtractTextPlugin({
  filename: "[name].css"
});

const config = [{
  entry: {
    main: [
      './src/sass/main.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/css'),
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
      './src/js/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
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
    index: [
      './src/html/index.html'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].html'
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
      filename: "[name].html"
    })
  ]
}];

module.exports = config;
