/**
 * Created by Huang, Fuguo (aka Ken) on 15/04/2016.
 */
const winston = require('winston');
const fileSystem = require('fs');
const path = require('path');
let logDir = path.resolve (__dirname, '..', '..', 'logs');
const megaBytes = 1024 * 1024;

if (!fileSystem.existsSync(logDir)) {
  // Create the directory if it does not exist
  fileSystem.mkdirSync(logDir);
}

let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name : 'error-log',
      level : 'error',
      handleExceptions: false,
      humanReadableUnhandledException: true,
      maxsize: megaBytes * 5,
      maxFiles: 1,
      filename: logDir + '/server_error.log'
    })
  ]
});

module.exports = logger;
