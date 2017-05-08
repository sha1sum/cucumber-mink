'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

/**
 * Private
 */

var seeText = function seeText(expected) {
  return this.driver.html().then(function (html) {
    (0, _chai.expect)(html).to.contain(expected);
  });
}; /**
    * Dependencies
    */

var notSeeText = function notSeeText(expected) {
  return this.driver.html().then(function (html) {
    (0, _chai.expect)(html).to.not.contain(expected);
  });
};

var matchText = function matchText(regex) {
  return this.driver.html().then(function (html) {
    (0, _chai.expect)(html).to.match(new RegExp(regex));
  });
};

var notMatchText = function notMatchText(regex) {
  return this.driver.html().then(function (html) {
    (0, _chai.expect)(html).to.not.match(new RegExp(regex));
  });
};

var elementContainsText = function elementContainsText(expected, selector) {
  return this.driver.html(selector).then(function (html) {
    (0, _chai.expect)(html).to.contain(expected);
  });
};

var elementNotContainsText = function elementNotContainsText(expected, selector) {
  return this.driver.html(selector).then(function (html) {
    (0, _chai.expect)(html).to.not.contain(expected);
  });
};

var elementTextContainsText = function elementTextContainsText(expected, selector) {
  return this.driver.text(selector).then(function (str) {
    (0, _chai.expect)(str).to.contain(expected);
  });
};

var elementTextNotContainsText = function elementTextNotContainsText(expected, selector) {
  return this.driver.text(selector).then(function (str) {
    (0, _chai.expect)(str).to.not.contain(expected);
  });
};

var elementsCount = function elementsCount(expected, selector) {
  return this.driver.elementsCount(selector).then(function (count) {
    (0, _chai.expect)(count).to.equal(parseInt(expected, 10));
  });
};

var elementState = function elementState(method, state) {
  return function (selector) {
    return this.driver[method](selector).then(function (isMethod) {
      (0, _chai.expect)(isMethod).to.equal(state);
    });
  };
};

/**
 * Interface
 */

exports.default = [[/I should see "([^"]*)"$/, seeText], [/I should not see "([^"]*)"$/, notSeeText], [/I should see text matching (.+)$/, matchText], [/I should not see text matching (.+)$/, notMatchText], [/I should see (\d+) "([^"]*)" elements?$/, elementsCount], [/I should see "([^"]*)" in the "([^"]*)" element$/, elementContainsText], [/I should see "([^"]*)" in the "([^"]*)" element text$/, elementTextContainsText], [/I should not see "([^"]*)" in the "([^"]*)" element$/, elementNotContainsText], [/I should not see "([^"]*)" in the "([^"]*)" element text$/, elementTextNotContainsText], [/I should see an? "([^"]*)" element$/, elementState('isVisible', true)], [/I should not see an? "([^"]*)" element$/, elementState('isVisible', false)], [/the "([^"]*)" element should be visible$/, elementState('isVisible', true)], [/the "([^"]*)" element should not be visible$/, elementState('isVisible', false)], [/the "([^"]*)" element should exist$/, elementState('isExisting', true)], [/the "([^"]*)" element should not exist$/, elementState('isExisting', false)], [/the "([^"]*)" (?:field|element) should be enabled$/, elementState('isEnabled', true)], [/the "([^"]*)" (?:field|element) should be disabled$/, elementState('isEnabled', false)], [/the "([^"]*)" checkbox should be checked$/, elementState('isChecked', true)], [/the checkbox "([^"]*)" (?:is|should be) checked$/, elementState('isChecked', true)], [/the "([^"]*)" checkbox should not be checked$/, elementState('isChecked', false)], [/the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/, elementState('isChecked', false)], [/the checkbox "([^"]*)" is (?:unchecked|not checked)$/, elementState('isChecked', false)]];
module.exports = exports['default'];