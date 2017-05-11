'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The MIT License (MIT)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 Arnaud Dezandee
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Authors:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/**
 * Dependencies
 */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _utilArity = require('util-arity');

var _utilArity2 = _interopRequireDefault(_utilArity);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _lodash = require('lodash.defaultsdeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _step = require('./step.js');

var _step2 = _interopRequireDefault(_step);

var _driver = require('./driver.js');

var _driver2 = _interopRequireDefault(_driver);

var _index = require('./step_definitions/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Private
 */

var debug = (0, _debug2.default)('mink');

var DEFAULT_PARAMS = {
  driver: {
    viewportSize: {
      width: 1366,
      height: 768
    },
    baseUrl: process.env.BASE_URL,
    desiredCapabilities: {
      browserName: 'chrome'
    },
    logLevel: 'silent',
    port: 4444
  },
  timeout: 5000,
  screenshotMethod: 'saveScreenshot',
  onInit: []
};

function noop() {}
// No operation performed.


/**
 * Public
 */

var Mink = function () {
  function Mink() {
    _classCallCheck(this, Mink);

    this.steps = _immutable2.default.Map();

    this.parameters = null;
    this.cucumber = null;
    this.driver = null;
  }

  /**
   * Mink initialization method and entry point
   *
   * @param {Object}  cucumber    cucumber-js context
   * @param {Object}  parameters
   * @returns {void}
   */


  _createClass(Mink, [{
    key: 'init',
    value: function init(cucumber) {
      var _this = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      debug('init', params);

      var parameters = (0, _lodash2.default)(params, DEFAULT_PARAMS);
      var driver = (0, _driver2.default)(parameters.driver);

      this.parameters = parameters;
      this.cucumber = cucumber;
      this.driver = driver;

      this.registerHooks(cucumber, driver);

      _index2.default.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            pattern = _ref2[0],
            fn = _ref2[1];

        _this.defineStep(pattern, fn);
      });

      parameters.onInit.forEach(function (fn) {
        return fn(_this);
      });
    }

    /**
     * Define a new step inside Mink-Cucumber context for use in .features files.
     *
     * @param {RegExp}    pattern    step regex
     * @param {Function}  fn         step function
     * @returns {Step}
     */

  }, {
    key: 'defineStep',
    value: function defineStep(pattern, fn) {
      var _this2 = this;

      debug('defineStep', pattern);

      if (!this.steps.has(pattern)) {
        this.steps = this.steps.set(pattern, new _step2.default(pattern, fn));

        if (this.cucumber) {
          var wrappedFn = (0, _utilArity2.default)(fn.length, function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _bluebird2.default.try(function () {
              return fn.apply(_this2, args);
            });
          });
          this.cucumber.defineStep(pattern, wrappedFn);
        }
      }

      return this.steps.get(pattern);
    }

    /**
     * Search for a matching registered step.
     *
     * @param {String} line
     * @returns {Step}
     */

  }, {
    key: 'findStep',
    value: function findStep(line) {
      debug('findStep', line);

      var step = this.steps.find(function (s) {
        return !!s.match(line);
      });
      if (!step) throw new Error('Could not findStep with line "' + line + '"');

      return step;
    }

    /**
     * @param {String} input line
     * @returns {Promise}
     */

  }, {
    key: 'runStep',
    value: function runStep(line) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      debug('runStep', line);

      var step = this.findStep(line);
      return step.runWith(this, line, cb);
    }

    /**
     * @param {Array} lines
     * @returns {Promise}
     */

  }, {
    key: 'manyStep',
    value: function manyStep(lines) {
      var _this3 = this;

      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      debug('manyStep', lines.join(', ').substr(0, 80));

      return _bluebird2.default.each(lines, function (line) {
        return _this3.runStep(line);
      }).asCallback(cb);
    }

    /**
     * @param {Array<Step>}
     * @returns {Promise}
     */

  }, {
    key: 'metaStep',
    value: function metaStep(steps) {
      var _this4 = this;

      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      debug('metaStep', steps);

      return _bluebird2.default.each(steps, function (step) {
        return step.runWith(_this4);
      }).asCallback(cb);
    }

    /**
     * Register mink driver hooks on cucumber context
     *
     * @param {Object} Cucumber         cucumber-js context
     * @param {Object} DriverInstance   mink driver instance
     * @returns {void}
     */

  }, {
    key: 'registerHooks',
    value: function registerHooks(cucumber, driver) {
      var _this5 = this;

      cucumber.registerHandler('BeforeFeatures', function () {
        return (/* event */driver.init().then(function () {
            return driver.setViewportSize(driver.parameters.viewportSize);
          })
        );
      });

      cucumber.registerHandler('AfterFeatures', function () {
        return (/* event */driver.end()
        );
      });

      cucumber.setDefaultTimeout(this.parameters.timeout);

      if (driver.parameters.screenshotPath) {
        cucumber.After(function (event) {
          if (!event.isFailed()) return null;

          var fileName = [event.getName() || 'Error', ':', event.getLine(), '.png'].join('');
          var filePath = _path2.default.join(driver.parameters.screenshotPath, fileName);
          debug('driver.' + _this5.parameters.screenshotMethod + '()', filePath);
          return driver[_this5.parameters.screenshotMethod](filePath);
        });
      }
    }
  }]);

  return Mink;
}();

// Aliases


Mink.prototype.Given = Mink.prototype.defineStep;
Mink.prototype.Then = Mink.prototype.defineStep;
Mink.prototype.When = Mink.prototype.defineStep;
Mink.prototype.DEFAULT_PARAMS = DEFAULT_PARAMS;
Mink.prototype.VERSION = _package2.default.version;

/**
 * Interface
 */

exports.default = new Mink();
module.exports = exports['default'];