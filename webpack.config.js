const path = require('path');

module.exports = {
  entry: ['./src/index.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'handsfree-for-website-modules.js',
    library: 'handsfreeForWebsiteModules',
    libraryTarget: 'umd',
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
};
