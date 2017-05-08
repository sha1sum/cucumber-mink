'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Private
 */

var debug = (0, _debug2.default)('mink:detectSeries');

var Result = function (_Error) {
  _inherits(Result, _Error);

  function Result(item, result) {
    _classCallCheck(this, Result);

    var _this = _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).call(this));

    _this.item = item;
    _this.result = result;
    return _this;
  }

  return Result;
}(Error);

/**
 * Public
 */

function detectSeries(arr, iterator, check) {
  return _bluebird2.default.each(arr, function (item) {
    return _bluebird2.default.try(function () {
      return iterator(item);
    }).tap(debug).then(function (result) {
      if (check(result)) {
        throw new Result(item, result);
      }
    });
  }).catch(function (_ref) {
    var item = _ref.item,
        result = _ref.result;
    return {
      item: item, result: result
    };
  });
}

/**
 * Interface
 */

exports.default = detectSeries;
module.exports = exports['default'];