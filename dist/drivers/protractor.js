'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url2 = require('url');

var _url3 = _interopRequireDefault(_url2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _detect_series = require('../utils/detect_series.js');

var _detect_series2 = _interopRequireDefault(_detect_series);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Private
 */

var debug = (0, _debug2.default)('mink:protractor');

/* eslint-disable quote-props */
var UNICODE_CHARACTERS = {
  'NULL': '\uE000',
  'Cancel': '\uE001',
  'Help': '\uE002',
  'Back space': '\uE003',
  'Tab': '\uE004',
  'Clear': '\uE005',
  'Return': '\uE006',
  'Enter': '\uE007',
  'Shift': '\uE008',
  'Control': '\uE009',
  'Alt': '\uE00A',
  'Pause': '\uE00B',
  'Escape': '\uE00C',
  'Space': '\uE00D',
  'Pageup': '\uE00E',
  'Page_Up': '\uE00E',
  'Pagedown': '\uE00F',
  'Page_Down': '\uE00F',
  'End': '\uE010',
  'Home': '\uE011',
  'Left arrow': '\uE012',
  'Arrow_Left': '\uE012',
  'Up arrow': '\uE013',
  'Arrow_Up': '\uE013',
  'Right arrow': '\uE014',
  'Arrow_Right': '\uE014',
  'Down arrow': '\uE015',
  'Arrow_Down': '\uE015',
  'Insert': '\uE016',
  'Delete': '\uE017',
  'Semicolon': '\uE018',
  'Equals': '\uE019',
  'Numpad 0': '\uE01A',
  'Numpad 1': '\uE01B',
  'Numpad 2': '\uE01C',
  'Numpad 3': '\uE01D',
  'Numpad 4': '\uE01E',
  'Numpad 5': '\uE01F',
  'Numpad 6': '\uE020',
  'Numpad 7': '\uE021',
  'Numpad 8': '\uE022',
  'Numpad 9': '\uE023',
  'Multiply': '\uE024',
  'Add': '\uE025',
  'Separator': '\uE026',
  'Subtract': '\uE027',
  'Decimal': '\uE028',
  'Divide': '\uE029',
  'F1': '\uE031',
  'F2': '\uE032',
  'F3': '\uE033',
  'F4': '\uE034',
  'F5': '\uE035',
  'F6': '\uE036',
  'F7': '\uE037',
  'F8': '\uE038',
  'F9': '\uE039',
  'F10': '\uE03A',
  'F11': '\uE03B',
  'F12': '\uE03C',
  'Command': '\uE03D',
  'Meta': '\uE03D',
  'Zenkaku_Hankaku': '\uE040'
};

var checkUnicode = function checkUnicode(value) {
  return {}.hasOwnProperty.call(UNICODE_CHARACTERS, value) ? [UNICODE_CHARACTERS[value]] : value.split('');
};

/**
 * Interface
 */

var ProtractorDriver = function () {
  function ProtractorDriver(parameters) {
    _classCallCheck(this, ProtractorDriver);

    this.parameters = parameters;
    this.browser = global.browser;
    this.by = global.By;

    Object.defineProperty(this, 'baseUrl', {
      set: function set(str) {
        this.browser.baseUrl = str;
      },
      get: function get() {
        return this.browser.baseUrl;
      }
    });
  }

  _createClass(ProtractorDriver, [{
    key: 'click',
    value: function click(selector) {
      if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && selector.getId) {
        return selector.click();
      }
      var locator = this.by.css(selector);
      return this.browser.element(locator).click();
    }
  }, {
    key: 'html',
    value: function html(selector) {
      var _this = this;

      if (selector) {
        var locator = this.by.css(selector);
        return this.browser.element.all(locator).map(function (el) {
          return _this.browser.executeScript('return arguments[0].outerHTML;', el);
        }).then(function (item) {
          if (Array.isArray(item)) return item.join('');
          return item;
        });
      }
      return this.browser.getPageSource();
    }
  }, {
    key: 'text',
    value: function text(selector) {
      var locator = this.by.css(selector);
      return this.browser.element.all(locator).map(function (el) {
        return el.getText();
      }).then(function (item) {
        if (Array.isArray(item)) return item.join('');
        return item;
      });
    }
  }, {
    key: 'url',
    value: function url(input) {
      if (input) {
        return this.browser.get(input);
      }
      return this.browser.getCurrentUrl().then(function (str) {
        return _url3.default.parse(str);
      });
    }
  }, {
    key: 'sendKey',
    value: function sendKey(selector, key) {
      var keys = [];
      if (typeof key === 'string') {
        keys = checkUnicode(key);
      } else if (key instanceof Array) {
        keys = key.reduce(function (acc, it) {
          return acc.concat(checkUnicode(it));
        }, []);
      }
      var locator = this.by.css(selector);
      return this.browser.findElement(locator).then(function (el) {
        return el.click().then(function () {
          return el.sendKeys.apply(el, _toConsumableArray(keys));
        });
      });
    }
  }, {
    key: 'elements',
    value: function elements(selector) {
      var locator = this.by.css(selector);
      return this.browser.findElements(locator);
    }
  }, {
    key: 'elementsCount',
    value: function elementsCount(selector) {
      return this.elements(selector).then(function (items) {
        return items.length;
      });
    }
  }, {
    key: 'elementsWithText',
    value: function elementsWithText(selector, text) {
      return this.elements(selector).then(function (items) {
        return _bluebird2.default.filter(items, function (el) {
          return el.getText().then(function (result) {
            return result === text;
          });
        });
      });
    }
  }, {
    key: 'elementsWithValue',
    value: function elementsWithValue(selector, value) {
      return this.elements(selector).then(function (items) {
        return _bluebird2.default.filter(items, function (el) {
          return el.getAttribute('value').then(function (result) {
            return result === value;
          });
        });
      });
    }
  }, {
    key: 'button',
    value: function button(mixed) {
      var _this2 = this;

      return (0, _detect_series2.default)([function () {
        return _this2.elements(mixed).catch(function (err) {
          debug(err);
          return [];
        });
      }, function () {
        return _this2.elementsWithText('button', mixed);
      }, function () {
        return _this2.elementsWithValue('input[type=submit]', mixed);
      }], function (fn) {
        return fn();
      }, function (WebElements) {
        return !!WebElements.length;
      }).then(function (_ref) {
        var result = _ref.result;

        if (!result) throw new Error('Button not found !');
        return result[0];
      });
    }
  }, {
    key: 'link',
    value: function link(mixed) {
      var _this3 = this;

      return (0, _detect_series2.default)([function () {
        return _this3.elements(mixed).catch(function (err) {
          debug(err);
          return [];
        });
      }, function () {
        return _this3.elementsWithText('body a', mixed);
      }], function (fn) {
        return fn();
      }, function (WebElements) {
        return !!WebElements.length;
      }).then(function (_ref2) {
        var result = _ref2.result;

        if (!result) throw new Error('Link not found !');
        return result[0];
      });
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      return this.browser.navigate().refresh();
    }
  }, {
    key: 'back',
    value: function back() {
      return this.browser.navigate().back();
    }
  }, {
    key: 'setValue',
    value: function setValue(selector, value) {
      var locator = this.by.css(selector);
      return this.browser.findElement(locator).then(function (el) {
        return el.clear().then(function () {
          return el.sendKeys(value);
        });
      });
    }
  }, {
    key: 'selectByVisibleText',
    value: function selectByVisibleText(selector, text) {
      var $select = this.browser.element(this.by.css(selector));
      var $option = $select.element(this.by.cssContainingText('option', text));
      return $select.click().then(function () {
        return $option.click();
      });
    }
  }, {
    key: 'submitForm',
    value: function submitForm(selector) {
      var locator = this.by.css(selector);
      return this.browser.element(locator).submit();
    }
  }, {
    key: 'setViewportSize',
    value: function setViewportSize(_ref3) {
      var width = _ref3.width,
          height = _ref3.height;

      return this.browser.manage().window().setSize(width, height);
    }
  }, {
    key: 'saveScreenshot',
    value: function saveScreenshot(filename) {
      return this.browser.takeScreenshot().then(function (png) {
        var screenshot = new Buffer(png, 'base64');
        if (typeof filename === 'string') {
          _fs2.default.writeFileSync(filename, screenshot);
        }
        return screenshot;
      });
    }
  }, {
    key: 'getValue',
    value: function getValue(selector) {
      var locator = this.by.css(selector);
      return this.browser.element(locator).getAttribute('value');
    }
  }, {
    key: 'hover',
    value: function hover(selector) {
      var _this4 = this;

      var locator = this.by.css(selector);
      return this.browser.findElement(locator).then(function (el) {
        return _this4.browser.actions().mouseMove(el).perform();
      });
    }
  }, {
    key: 'isEnabled',
    value: function isEnabled(selector) {
      var locator = this.by.css(selector);
      return this.browser.element(locator).isEnabled();
    }
  }, {
    key: 'isExisting',
    value: function isExisting(selector) {
      var locator = this.by.css(selector);
      return this.browser.element(locator).isPresent();
    }
  }, {
    key: 'isSelected',
    value: function isSelected(selector) {
      var locator = this.by.css(selector);
      return this.browser.element(locator).isSelected();
    }
  }, {
    key: 'isVisible',
    value: function isVisible(selector) {
      var locator = this.by.css(selector);
      return this.browser.element(locator).isDisplayed();
    }
  }, {
    key: 'init',
    value: function init() {
      // Handled by protractor, no-op
      return _bluebird2.default.resolve();
    }
  }, {
    key: 'end',
    value: function end() {
      // Handled by protractor, no-op
      return _bluebird2.default.resolve();
    }
  }]);

  return ProtractorDriver;
}();

// Aliases


exports.default = ProtractorDriver;
ProtractorDriver.prototype.isChecked = ProtractorDriver.prototype.isSelected;
ProtractorDriver.prototype.check = ProtractorDriver.prototype.click;
ProtractorDriver.prototype.uncheck = ProtractorDriver.prototype.click;
module.exports = exports['default'];