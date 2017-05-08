#!/usr/bin/env node
'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _cucumber = require('cucumber');

var _cucumber2 = _interopRequireDefault(_cucumber);

var _rewire = require('./cli/rewire.js');

var _rewire2 = _interopRequireDefault(_rewire);

var _mink = require('./mink.js');

var _mink2 = _interopRequireDefault(_mink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Dependencies
 */

/**
 * CLI
 */

var debug = (0, _debug2.default)('mink:cli');

var cli = (0, _meow2.default)('\n  Usage: cucumber-mink [options] -- [CUCUMBER ARGS]\n\n  Options:\n    --inject       Mink auto-inject in context           [Boolean] [default: true]\n    --browser      Desired browser name              [String] [default: "firefox"]\n    --port         Selenium server port                            [default: 4444]\n    --timeout      Cucumber function timeout in ms                 [default: 5000]\n    -h, --help     Display help message                                  [Boolean]\n    -v, --version  Display package version                               [Boolean]\n', {
  default: {
    inject: true,
    browser: 'chrome',
    port: 4444,
    timeout: 5000
  },
  boolean: ['inject'],
  alias: {
    v: 'version',
    h: 'help'
  }
});

var injectArgs = function injectArgs(flags) {
  if (!flags.inject) return [];

  var params = _mink2.default.DEFAULT_PARAMS;
  params.driver.desiredCapabilities.browserName = flags.browser;
  params.driver.port = flags.port;
  params.timeout = flags.timeout;

  var inject = require('./cli/support/mink_inject.js');

  var injectPath = _path2.default.join(__dirname, '/cli/support/mink_inject.js');
  (0, _rewire2.default)(injectPath, inject(params));

  return ['--require', injectPath];
};

var execArgs = ['node', 'cucumber-js'].concat(_toConsumableArray(injectArgs(cli.flags)), _toConsumableArray(cli.input));

debug(execArgs);

_cucumber2.default.Cli(execArgs).run(function (success) {
  process.exit(success ? 0 : 1);
});