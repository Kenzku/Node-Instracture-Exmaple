'use strict';
// please do not use ES6 module syntax
const keyMirror = require('keymirror');
const websocket = keyMirror({
  'rpc:joined': null,
  'rpc:server-send-latest-config': null,
  'rpc:get-latest-config': null
});

// Settings configured here will be merged into the final webpack_env_config object.
module.exports = {
  websocket
};
