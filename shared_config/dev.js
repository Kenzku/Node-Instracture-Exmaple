'use strict';
// please do not use ES6 module syntax
let baseConfig = require('./base');

let config = {
  appEnv: /*please do not change this to prod*/'dev',
  displayEnv: /*use production or dev*/'production' //Allows for the system to display what will be seen in production while still running in a different mode
};

module.exports = Object.freeze(Object.assign({}, baseConfig, config));
