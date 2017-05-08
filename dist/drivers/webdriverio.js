'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _url2 = require('url');

var _url3 = _interopRequireDefault(_url2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _detect_series = require('../utils/detect_series.js');

var _detect_series2 = _interopRequireDefault(_detect_series);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Private
 */

var debug = (0, _debug2.default)('mink:webdriverio');

/**
 * Interface
 */

var WdIODriver = function () {
  function WdIODriver(parameters) {
    _classCallCheck(this, WdIODriver);

    this.parameters = parameters;
    this.client = require('webdriverio').remote(parameters);

    this.baseUrl = parameters.baseUrl;
  }

  _createClass(WdIODriver, [{
    key: 'click',
    value: function click(selector) {
      if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && selector.ELEMENT) {
        return this.client.elementIdClick(selector.ELEMENT);
      }
      return this.client.click(selector);
    }
  }, {
    key: 'html',
    value: function html(selector) {
      if (!selector) {
        return this.client.getSource();
      }
      return this.client.getHTML(selector).then(function (item) {
        if (Array.isArray(item)) return item.join('');
        return item;
      });
    }
  }, {
    key: 'text',
    value: function text(selector) {
      return this.client.getText(selector).then(function (item) {
        if (Array.isArray(item)) return item.join('');
        return item;
      });
    }
  }, {
    key: 'url',
    value: function url(input) {
      if (!input) {
        return this.client.getUrl().then(function (text) {
          return _url3.default.parse(text);
        });
      }
      return this.client.url(input);
    }
  }, {
    key: 'sendKey',
    value: function sendKey(selector, key) {
      var _this = this;

      return this.client.click(selector).then(function () {
        return _this.client.keys(key);
      });
    }
  }, {
    key: 'elements',
    value: function elements(selector) {
      return this.client.elements(selector).then(function (response) {
        return response.value;
      });
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
      var _this2 = this;

      return this.elements(selector).then(function (items) {
        return _bluebird2.default.filter(items, function (WebElement) {
          return _this2.client.elementIdText(WebElement.ELEMENT).then(function (result) {
            return result.value === text;
          });
        });
      });
    }
  }, {
    key: 'elementsWithValue',
    value: function elementsWithValue(selector, value) {
      var _this3 = this;

      return this.elements(selector).then(function (items) {
        return _bluebird2.default.filter(items, function (WebElement) {
          return _this3.client.elementIdAttribute(WebElement.ELEMENT, 'value').then(function (result) {
            return result.value === value;
          });
        });
      });
    }
  }, {
    key: 'button',
    value: function button(mixed) {
      var _this4 = this;

      return (0, _detect_series2.default)([function () {
        return _this4.elements(mixed).catch(function (err) {
          debug(err);
          return [];
        });
      }, function () {
        return _this4.elementsWithText('button', mixed);
      }, function () {
        return _this4.elementsWithValue('input[type=submit]', mixed);
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
      var _this5 = this;

      return (0, _detect_series2.default)([function () {
        return _this5.elements(mixed).catch(function (err) {
          debug(err);
          return [];
        });
      }, function () {
        return _this5.elementsWithText('body a', mixed);
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
  }]);

  return WdIODriver;
}();

// WebDriverIO client symlinks


['init', 'refresh', 'back', 'end', 'setValue', 'selectByVisibleText', 'submitForm', 'windowHandleSize', 'saveScreenshot', 'getValue', 'moveToObject', 'isEnabled', 'isExisting', 'isSelected', 'isVisible'].forEach(function (method) {
  WdIODriver.prototype[method] = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _bluebird2.default.resolve(this.client[method].apply(this, args));
  };
});

// Aliases
WdIODriver.prototype.isChecked = WdIODriver.prototype.isSelected;
WdIODriver.prototype.check = WdIODriver.prototype.click;
WdIODriver.prototype.uncheck = WdIODriver.prototype.click;
WdIODriver.prototype.hover = WdIODriver.prototype.moveToObject;
WdIODriver.prototype.setViewportSize = WdIODriver.prototype.windowHandleSize;

exports.default = WdIODriver;
module.exports = exports['default'];