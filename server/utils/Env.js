/**
 * Created by Huang, Fuguo (aka ken) on 16/08/2017.
 */
const args = require('minimist')(process.argv.slice(2));
// Set the correct environment
let env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}

module.exports = env;
