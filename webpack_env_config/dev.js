'use strict';
/**
 * Created by Huang, Fuguo (a.k.a Ken)
 */

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const {rules, defaultSettings} = require('./defaults');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('babel-polyfill');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'babel-polyfill',
    path.resolve(defaultSettings.path.clientSourcePath, 'index')
  ],
  cache: true,
  devtool: 'eval',
  devServer: {
    contentBase: './client/src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.path.publicPath,
    noInfo: false,
    /*for stats config: https://webpack.js.org/configuration/stats/*/
    stats: {
      // `webpack --colors` equivalent
      colors: true,
      // Add the hash of the compilation
      hash: false,
      // Add timing information
      timings: true,
      // Add chunk information (setting this to `false` allows for a less verbose output)
      chunks: false,
      // Add built modules information to chunk information
      chunkModules: false,
      // Add built modules information
      modules: false,
      // Add information about cached (not built) modules
      cached: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(defaultSettings.path.clientSourcePath, 'real_index.template.html'),
      inject: false,
      filename: 'real_index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  /*Ref: https://webpack.js.org/configuration/watch/*/
  watchOptions: {
    /*Add a delay before rebuilding once the first file changed.*/
    aggregateTimeout: 700,
    /*If watching does not work for you, try out this option. Watching does not work with NFS and machines in VirtualBox.*/
    poll: false /* by setting to 1000, it means to check for changes every second (1000ms)*/
  },
  module: {rules}
});
module.exports = config;
