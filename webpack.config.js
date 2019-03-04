const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/App.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html'
    })
  ]
};
