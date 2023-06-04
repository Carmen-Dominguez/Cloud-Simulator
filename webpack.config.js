var path = require('path');
var webpack = require('webpack');

module.exports = {
  // 1
  entry: './src/index.js',
  // 2
  output: {
    path: '/dist',
    filename: 'bundle.js'
  },
  // 3
  devServer: {
    static: './dist'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
  },
  module: {
    rules: []
  },
};