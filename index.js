'use strict';

const fs = require('fs');
const path = require('path');

const camelCaseMatcher = /(?:^\w|[A-Z]|\b\w)/g;
const nonAlphanumericCharacters = /^[^a-zA-Z]+|[^a-zA-Z0-9]+/g;

const camelCase = (str) => {
  str = str.replace(camelCaseMatcher, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase());
  str = str.replace(nonAlphanumericCharacters, '');

  return str;
};

const defaultFilter = (fileName, fileExt) => {
  return ['.js', '.json'].includes(fileExt);
};

const defaultMapper = (fileName) => {
  return camelCase(fileName);
};

/**
 * Index the directory of a given module and export all other files, with optional filename filter
 * and module name mapper functions.
 *
 * @param {object} module - Node module object to add exports to (module.exports will be mutated).
 * @param {function?} filter - Optional filename filter (default includes all .js and .json files).
 * @param {function?} mapper - Optional module name mapper (default is a camelCase function).
 */
module.exports = (module, filter = defaultFilter, mapper = defaultMapper) => {
  let moduleFile;
  let siblings;

  if (!module.exports || typeof module.exports !== 'object') {
    module.exports = {};
  }

  if (typeof filter !== 'function') {
    filter = defaultFilter;
  }

  if (typeof mapper !== 'function') {
    mapper = defaultMapper;
  }

  moduleFile = path.parse(module.filename);
  siblings = fs.readdirSync(moduleFile.dir);

  siblings.forEach((sibling) => {
    let moduleName;
    let siblingFile;

    siblingFile = path.parse(sibling);

    if (siblingFile.base === moduleFile.base) {
      return;
    }

    if (!filter(siblingFile.name, siblingFile.ext)) {
      return;
    }

    moduleName = mapper(siblingFile.name, siblingFile.ext);

    module.exports[moduleName] = require(path.resolve(moduleFile.dir, siblingFile.base));
  });
};
