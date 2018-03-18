# Index.js
Automatically export all other modules in the same directory. No configuration, no dependencies.

## Install

```bash
$ npm install --save index-module
```

## Standard Usage

Add the following line of code to an `index.js` file in any directory to add all other `.js` and `.json` files in that directory to `module.exports`. The module names will be camelCase and will not begin with a number or have any special characters.

```js
require('index-module')(module);
```

Note that your file does not need to be called `index.js`, this is just the standard use so you can require all files in a directory by requiring the relative path of the directory.

## Custom Filter

You can pass a custom filename filter function as the second argument, to control which filenames or file extensions are exported.

```js
const customFilter = (fileName, fileExt) => {
  return fileExt === '.js'; // ignore .json and all other file types
};

require('index-module')(module, customFilter);
```

## Custom Mapper

You can pass a customer module name mapper function as the third argument, to control how a filename is converted to an exported module name.

```js
const _ = require('lodash');

const customMapper = (fileName, fileExt) => {
  let moduleName = _.camelCase(fileName);
  let startsWithCapitalLetter = fileName.charAt(0) === fileName.toUpperCase().charAt(0);

  if (startsWithCapitalLetter && fileExt !== '.json') {
    moduleName = _.upperFirst(moduleName);
  }

  return moduleName;
};

require('index-module')(module, null, customMapper);
```

## Tests

```bash
$ npm test
```
