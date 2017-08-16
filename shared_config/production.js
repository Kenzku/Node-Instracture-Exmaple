'use strict';
// please do not use ES6 module syntax
let baseConfig = require('./base');

let config = {
  appEnv: /*do NOT change this*/'production',
  displayEnv: 'production' //Allows for the system to display what will be seen in production while still running in a different mode,
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
