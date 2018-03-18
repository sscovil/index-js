'use strict';

const customMapper = (fileName, fileExt) => {
  return fileExt === '.json' ? fileName.toUpperCase() : fileName.toLowerCase();
};

require('../../index')(module, null, customMapper);
