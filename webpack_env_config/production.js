'use strict';
/**
 * Created by Huang, Fuguo (a.k.a Ken)
 */

const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./base');
const {rules, defaultSettings} = require('./defaults');
require('babel-polyfill');

let config = Object.assign({}, baseConfig, {
  entry: [
    'babel-polyfill',
    path.resolve(defaultSettings.path.clientSourcePath, 'index')
  ],
  cache: false,
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // turn off third party libs warnings
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {rules}
});

module.exports = config;
