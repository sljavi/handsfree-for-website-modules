const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV;
const devtool = 'source-map';
const moduleConfig = {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  }],
};

module.exports = [{
  entry: {
    path: ['./src/index.js'],
  },
  mode,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'handsfree-for-website-modules.js',
    library: 'handsfreeForWebsiteModules',
    libraryTarget: 'umd',
  },
  devtool,
  module: moduleConfig,
  externals: {
    lodash: 'lodash',
    moment: 'moment',
    jquery: 'jquery',
  },
  plugins: [
    new CopyPlugin([{
      from: './node_modules/handsfree-for-website/dist/fonts',
      to: 'fonts',
    }]),
  ],
}, {
  entry: {
    docs: ['@babel/polyfill', './src/docs/index.js'],
  },
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'docs.js',
  },
  devServer: {
    https: true,
    contentBase: './dist',
  },
  devtool,
  module: moduleConfig,
  plugins: [
    new CopyPlugin([{
      from: './src/docs/index.html',
      to: '',
    }, {
      from: './src/docs/style.css',
      to: '',
    }]),
  ],
}];
