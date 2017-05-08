'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startMocking;

var _module2 = require('module');

var _module3 = _interopRequireDefault(_module2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var originalLoader = _module3.default._load; /**
                                              * Dependencies
                                              */

var intercept = {};

/* eslint prefer-rest-params: 0 */
_module3.default._load = function (request) {
  if ({}.hasOwnProperty.call(intercept, request)) {
    return intercept[request];
  }

  return originalLoader.apply(this, arguments);
};

/**
 * Interface
 */

function startMocking(path, mockExport) {
  intercept[path] = mockExport;
}
_module3.default.exports = exports['default'];