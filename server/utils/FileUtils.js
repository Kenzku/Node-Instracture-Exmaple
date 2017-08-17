const path = require('path');
const sep = path.sep;
const logger = require(__dirname + '/CustomisedLogger'); // higher level log is not ready

const clazz = 'FileUtils';

function FileUtils() {
  let self = this;
  const fileSystem = require('fs');

  self.mkdir = (dirPath) => {
    try {
      let dirSegments = dirPath.split(sep); // OS adjustment
      let normalisedPath = path.resolve(sep, ...dirSegments); // OS adjustment

      if (/*path not exist*/!fileSystem.existsSync(normalisedPath)) {
        // Create the directory if it does not exist
        fileSystem.mkdirSync(normalisedPath);
      }
      return true;
    } catch (e) {
      console.error(clazz, e, 'cannot create logs folder');
      logger.error(clazz, e, 'cannot create logs folder');
    }
    return false;
  };
}

module.exports = FileUtils;
