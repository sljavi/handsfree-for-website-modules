const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    handsfreeForWebsiteModules: './src/index.js',
    docs: ['@babel/polyfill', './src/docs/index.js'],
  },
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'handsfreeForWebsiteModules',
    libraryTarget: 'umd',
  },
  devServer: {
    https: true,
    contentBase: './dist',
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  externals: {
    lodash: 'lodash',
    moment: 'moment',
    jquery: 'jquery',
  },
  plugins: [
    new CopyPlugin([{
      from: './src/docs/index.html',
      to: '',
    }, {
      from: './src/docs/style.css',
      to: '',
    }, {
      from: './node_modules/handsfree-for-website/dist/fonts',
      to: 'fonts',
    }]),
  ],
};
