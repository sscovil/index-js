'use strict';

const {expect} = require('chai');
const index = require('../../../example/custom-mapper');

it('exports all files in the directory with module names returned from custom mapper', function () {
  expect(index).to.be.an('object');

  expect(index.foo).to.be.an('object');
  expect(index.foo.filename).to.have.string('foo.js');

  expect(index['foo-bar']).to.be.an('object');
  expect(index['foo-bar'].filename).to.have.string('foo-bar.js');

  expect(index.foobarbaz).to.be.an('object');
  expect(index.foobarbaz.filename).to.have.string('fooBarBaz.js');

  expect(index['1_SOME.JSON']).to.be.an('object');
  expect(index['1_SOME.JSON'].filename).to.equal('1_example.json');
});
