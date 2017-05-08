'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Private
 */

function noop() {}
// No operation performed.


/**
 * Interface
 */

var Step = function () {
  function Step(pattern, fn) {
    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Step);

    this.pattern = pattern;
    this.fn = fn;
    this.args = args;
  }

  _createClass(Step, [{
    key: 'match',
    value: function match(line) {
      return line.match(this.pattern);
    }
  }, {
    key: 'runWith',
    value: function runWith(context, line) {
      var _this = this;

      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

      var args = line ? this.match(line).slice(1) : this.args;
      return _bluebird2.default.try(function () {
        return _this.fn.apply(context, args);
      }).asCallback(cb);
    }
  }]);

  return Step;
}();

exports.default = Step;
module.exports = exports['default'];