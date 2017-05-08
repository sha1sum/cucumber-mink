'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = require('../utils/errors.js');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Private
 */

var click = function click(selector) {
  return this.driver.click(selector);
}; /**
    * Dependencies
    */

var hover = function hover(selector) {
  return this.driver.hover(selector);
};

var submit = function submit(selector) {
  return this.driver.submitForm(selector);
};

var press = function press(selector) {
  var _this = this;

  return this.driver.button(selector).then(function (item) {
    if (!item) throw new Error(_errors2.default.ACTION.CLICK_BUTTON);
    return _this.driver.click(item);
  });
};

var follow = function follow(selector) {
  var _this2 = this;

  return this.driver.link(selector).then(function (item) {
    if (!item) throw new Error(_errors2.default.ACTION.CLICK_LINK);
    return _this2.driver.click(item);
  });
};

var sendKey = function sendKey(key, selector) {
  return this.driver.sendKey(selector, key);
};

/**
 * Interface
 */

exports.default = [[/I click on "([^"]*)"/, click], [/I press "([^"]*)"/, press], [/I follow "([^"]*)"/, follow], [/I hover "([^"]*)" element/, hover], [/I submit "([^"]*)" form/, submit], [/I send key "([^"]*)" in "([^"]*)" element/, sendKey]];
module.exports = exports['default'];