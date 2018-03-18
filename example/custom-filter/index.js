'use strict';

const customFilter = (fileName, fileExt) => {
  return fileExt === '.js';
};

require('../../index')(module, customFilter);
