'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureDriver;

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _protractor = require('./drivers/protractor.js');

var _protractor2 = _interopRequireDefault(_protractor);

var _webdriverio = require('./drivers/webdriverio.js');

var _webdriverio2 = _interopRequireDefault(_webdriverio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Private
 */

var debug = (0, _debug2.default)('mink:driver');

/**
 * Interface
 */

/**
 * Dependencies
 */

function configureDriver(parameters) {
  debug(parameters);

  if (!!parameters.protractor && global.protractor) {
    return new _protractor2.default(parameters);
  }

  return new _webdriverio2.default(parameters);
}
module.exports = exports['default'];