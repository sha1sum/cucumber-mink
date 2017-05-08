'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

/**
 * Private
 */

var currentOption = function currentOption(selector, expected) {
  var _this = this;

  return this.driver.getValue(selector).then(function (value) {
    return _this.driver.html(selector + ' option[value="' + value + '"]').then(function (html) {
      (0, _chai.expect)(html).to.contain(expected);
    });
  });
}; /**
    * Dependencies
    */

var fieldContains = function fieldContains(selector, expected) {
  return this.driver.getValue(selector).then(function (value) {
    (0, _chai.expect)(value).to.contain(expected);
  });
};

var fieldNotContains = function fieldNotContains(selector, expected) {
  return this.driver.getValue(selector).then(function (value) {
    (0, _chai.expect)(value).to.not.contain(expected);
  });
};

/**
 * Interface
 */

exports.default = [[/the "([^"]*)" current option contain "([^"]*)"/, currentOption], [/the "([^"]*)" field should contain "([^"]*)"/, fieldContains], [/the "([^"]*)" field should not contain "([^"]*)"/, fieldNotContains]];
module.exports = exports['default'];