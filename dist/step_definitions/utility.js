'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Private
 */

var viewport = function viewport(width, height) {
  return this.driver.setViewportSize({
    width: parseInt(width, 10),
    height: parseInt(height, 10)
  });
}; /**
    * Dependencies
    */

var wait = function wait(seconds) {
  return _bluebird2.default.delay(parseInt(seconds, 10) * 1000);
};

var screenshot = function screenshot() {
  return this.driver.saveScreenshot('./screenshot.png');
};

/**
 * Interface
 */

exports.default = [[/I wait (\d+) seconds?/, wait], [/the viewport is (\d+)px width and (\d+)px height/, viewport], [/I take a screenshot/, screenshot]];
module.exports = exports['default'];