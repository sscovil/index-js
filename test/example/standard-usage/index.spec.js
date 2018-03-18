'use strict';

const {expect} = require('chai');
const index = require('../../../example/standard-usage');

it('exports all .js and .json files in directory, with camelCase module names', function () {
  expect(index).to.be.an('object');

  expect(index.foo).to.be.an('object');
  expect(index.foo.filename).to.have.string('foo.js');

  expect(index.fooBar).to.be.an('object');
  expect(index.fooBar.filename).to.have.string('foo-bar.js');

  expect(index.fooBarBaz).to.be.an('object');
  expect(index.fooBarBaz.filename).to.have.string('fooBarBaz.js');

  expect(index.someJson).to.be.an('object');
  expect(index.someJson.filename).to.equal('1_example.json');
});
