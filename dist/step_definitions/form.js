'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Private
 */

var fillField = function fillField(selector, value) {
  return this.driver.setValue(selector, value);
};

var fillFieldsHash = function fillFieldsHash(hashDataTable) {
  var _this = this;

  return _bluebird2.default.each(hashDataTable.raw(), function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        field = _ref2[0],
        value = _ref2[1];

    return _this.driver.setValue(field, value);
  });
};

var selectFrom = function selectFrom(option, selector) {
  return this.driver.selectByVisibleText(selector, option);
};

var checkInput = function checkInput(state) {
  return function (selector) {
    var _this2 = this;

    return this.driver.isChecked(selector).then(function (isChecked) {
      if (isChecked !== state) {
        return _this2.driver.check(selector);
      }
      return null;
    });
  };
};

/**
 * Interface
 */

exports.default = [[/I fill in "([^"]*)" with "([^"]*)"/, fillField], [/I fill in "([^"]*)" with:/, fillField], [/I fill in the following:/, fillFieldsHash], [/I select "([^"]*)" from "([^"]*)"/, selectFrom], [/I check "([^"]*)"/, checkInput(true)], [/I uncheck "([^"]*)"/, checkInput(false)]];
module.exports = exports['default'];