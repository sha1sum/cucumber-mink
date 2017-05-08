'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _errors = require('../utils/errors.js');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Private
*/

// From https://github.com/sindresorhus/is-absolute-url
/**
 * Dependencies
 */

var isAbsoluteUrl = function isAbsoluteUrl(location) {
  return (/^(?:\w+:)\/\//.test(location)
  );
};

var parseUrlWithEnv = function parseUrlWithEnv(location) {
  var matches = /^\${([^"]*)}/.exec(location);
  return matches ? process.env[matches[1]] + location.replace(matches[0], '') : location;
};

var setBaseURL = function setBaseURL(location) {
  var finalLocation = parseUrlWithEnv(location);

  if (!isAbsoluteUrl(finalLocation)) {
    throw new Error(_errors2.default.NAVIGATION.BASE_URL);
  }

  this.driver.baseUrl = finalLocation;
};

var goRoot = function goRoot() {
  if (!this.driver.baseUrl) {
    throw new Error(_errors2.default.NAVIGATION.ROOT);
  }

  return this.driver.url(this.driver.baseUrl);
};

var goTo = function goTo(location) {
  var finalLocation = location;

  if (!isAbsoluteUrl(location) && this.driver.baseUrl) {
    finalLocation = _url2.default.resolve(this.driver.baseUrl, location);
  }

  return this.driver.url(finalLocation);
};

var refresh = function refresh() {
  return this.driver.refresh();
};

var goBack = function goBack() {
  return this.driver.back();
};

/**
 * Interface
 */

exports.default = [[/I browse "([^"]*)"/, setBaseURL], [/I am on (?:|the )homepage/, goRoot], [/I go to (?:|the )homepage/, goRoot], [/I am on "([^"]*)"/, goTo], [/I go to "([^"]*)"/, goTo], [/I reload the page/, refresh], [/I move backward one page/, goBack]];
module.exports = exports['default'];