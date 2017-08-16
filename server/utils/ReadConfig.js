/**
 * Created by Huang, Fuguo (aka Ken) on 16/08/2017.
 */
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const logger = require(__dirname + '/CustomisedLogger'); // higher level log is not ready

let config = null;

function getConfig() {
  let latestConfig = null;
  try {
    if (fs.existsSync(path.resolve(__dirname, '..', 'config', 'config.dev.yml'))) {
      latestConfig = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '..', 'config', 'config.dev.yml'), 'utf8'));
    } else {
      latestConfig = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '..', 'config', 'config.yml'), 'utf8'));
    }
  } catch (e) {
    logger.error('cannot read configuration file at', path.resolve(__dirname, '..', 'config'), e);
  }
  return latestConfig;
}

/**
 * Return a mixin of config.yml (or dev version) and mode file (or its dev version)
 * config file is under config folder
 * mode files are defined under mode folder
 * @returns {*}
 */
function getLatestConfig() {
  return getConfig();
}

//return the config values, as well as a method to get the latest config if desired
config = getLatestConfig();
config.getLatestConfig = getLatestConfig;

module.exports = config;
