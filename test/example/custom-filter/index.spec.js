'use strict';

const {expect} = require('chai');
const index = require('../../../example/custom-filter');

it('exports all files in the directory that return true when passed to custom filter', function () {
  expect(index).to.be.an('object');

  expect(index.foo).to.be.an('object');
  expect(index.foo.filename).to.have.string('foo.js');

  expect(index.fooBar).to.be.an('object');
  expect(index.fooBar.filename).to.have.string('foo-bar.js');

  expect(index.fooBarBaz).to.be.an('object');
  expect(index.fooBarBaz.filename).to.have.string('fooBarBaz.js');

  expect(index.someJson).to.equal(undefined);
});
