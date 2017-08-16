'use strict';
/**
 * Created by Huang, Fuguo (a.k.a Ken)
 */

let path = require('path');
let {defaultSettings} = require('./defaults');

module.exports = {
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'app.js',
    publicPath: `.${defaultSettings.path.publicPath}`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: defaultSettings.path.alias
  }
};
