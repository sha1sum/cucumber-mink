'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

/**
 * Private
 */

var isEqual = function isEqual(location) {
  return this.driver.url().then(function (parsed) {
    (0, _chai.expect)(parsed.pathname).to.equal(location);
  });
}; /**
    * Dependencies
    */

var isRoot = function isRoot() {
  return isEqual.bind(this)('/');
};

var urlMatch = function urlMatch(regex) {
  return this.driver.url().then(function (parsed) {
    (0, _chai.expect)(parsed.pathname).to.match(new RegExp(regex));
  });
};

var queryMatch = function queryMatch(regex) {
  return this.driver.url().then(function (parsed) {
    (0, _chai.expect)(parsed.search).to.match(new RegExp(regex));
  });
};

/**
 * Interface
 */

exports.default = [[/I should be on "([^"]*)"/, isEqual], [/I should be on (?:|the )homepage/, isRoot], [/the url should match (.+)/, urlMatch], [/the url parameter should match (.+)/, queryMatch]];
module.exports = exports['default'];