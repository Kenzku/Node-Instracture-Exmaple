/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 *
 * Modified by Huang, Fuguo (a.k.a. Ken) on 3.Aug.2017
 */
'use strict';

const path = require('path');

const defaultPort = 3000;

const clientSourcePath = path.resolve(__dirname, '..', 'client', 'src');
const sharedConfigPath = path.resolve(__dirname, '..', 'shared_config');
const clientConfigPath = path.resolve(__dirname, '..', 'client', 'client_config');

const projectRoot = path.resolve(__dirname, '..');
const clientRoot = path.resolve(projectRoot,'client');
const serverRoot = path.resolve(projectRoot,'server');

const actions = path.resolve(clientSourcePath,'actions');
const components = path.resolve(clientSourcePath,'components');
const sources = path.resolve(clientSourcePath,'sources');
const stores = path.resolve(clientSourcePath,'stores');
const styles = path.resolve(clientSourcePath,'styles');
const images = path.resolve(clientSourcePath,'images');
const client_config = path.resolve(clientConfigPath, process.env.REACT_WEBPACK_ENV);
const shared_config = path.resolve(sharedConfigPath, process.env.REACT_WEBPACK_ENV);
const api_service = path.resolve(clientSourcePath,'api_services');
const src_root = path.resolve(clientSourcePath);

console.log(`--------------------  Environment is ${process.env.REACT_WEBPACK_ENV} --------------------
              project root path: ${projectRoot}
              server root path: ${serverRoot}
              shared config path: ${shared_config}
              client root path: ${clientRoot}
              client config path: ${client_config}
              client service path: ${api_service}`);

/*NodeJS uses commonJS as export/import*/
module.exports.rules = [
  /*Migration from Webpack v1 - add preLoaders and postLoaders here*/
  {
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    include: [clientRoot, serverRoot, sharedConfigPath],
    loader: 'eslint-loader'
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    include: [clientRoot, sharedConfigPath],
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
  },
  {
    test: /\.(scss|sass)$/,
    use: [
      'style-loader', // creates style nodes from JS strings
      'css-loader', // translates CSS into CommonJS
      {
        loader: 'sass-loader', // compiles Sass to CSS
        options: {
          outputStyle: 'expanded' // Determines the output format of the final CSS style: Type: String Default: nested Values: nested, expanded, compact, compressed
        }
      }
    ]
  },
  {
    test: /\.less$/,
    use: [
      'style-loader', // creates style nodes from JS strings
      'css-loader', // translates CSS into CommonJS
      'less-loader' // compiles Less to CSS
    ]
  },
  {
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      'stylus-loader'
    ]
  },
  {
    test: /\.(png|jpg|gif|woff|woff2)(\?.*$|$)/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: 'resources/[name]-[hash:base64:7].[ext]',
          limit: 8192
        }
      }
    ]
  },
  {
    test: /\.(ttf|eot|mp4|ogg|svg$)(\?.*$|$)/,
    loader: 'file-loader',
    options: {
      name: 'resources/[name]-[hash:base64:7].[ext]'
    }
  }
];

module.exports.defaultSettings = {
  port: defaultPort,
  path : {
    projectRoot,
    clientSourcePath,
    publicPath: '/',
    /*alias below:*/
    alias: {
      actions,
      components,
      sources,
      stores,
      styles,
      images,
      client_config,
      shared_config,
      api_service,
      src_root
    }
  }
};
