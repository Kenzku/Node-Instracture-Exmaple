/**
 * Created by Huang, Fuguo (aka Ken) on 16/08/2017.
 */
const path = require('path');
const winston = require('winston');
const customisedLogger = require(__dirname + '/CustomisedLogger');
const FileUtils = require(__dirname + '/FileUtils');

const clazz = 'Logger';

const pluginConfig = require(__dirname + '/ReadConfig');
const megaBytes = 1024 * 1024;

const defaultMaxLogFiles = 10;
const defaultMaxLogSize = 5; // MB

if (pluginConfig) {
  try {
    if (pluginConfig.log && pluginConfig.log.logToConsole === true) {
      const fileUtilsObj = new FileUtils();
      const isSucceed = fileUtilsObj.mkdir(pluginConfig.log.logsDir);
      if (isSucceed) {
        customisedLogger.add(winston.transports.File, {
          name: 'all-log',
          level: pluginConfig.log.logLevel,
          timestamp: true,
          maxsize: megaBytes * pluginConfig.log.maxLogSize || defaultMaxLogSize,
          maxFiles: pluginConfig.log.maxLogFiles || defaultMaxLogFiles,
          filename: path.resolve(pluginConfig.log.logsDir, 'server_console.log')
        });
      } else {
        new Error(clazz, 'create logs folder failure');
      }

    }
  } catch (e) {
    console.error(clazz, e, 'Cannot create log file');
    customisedLogger.error(clazz, e, 'Cannot create log file');
  }

}
module.exports = customisedLogger;
