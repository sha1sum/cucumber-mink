'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Interface
 */

exports.default = {
  ACTION: {
    CLICK_LINK: 'Unable to find a link with selector or text matching',
    CLICK_BUTTON: 'Unable to find button / input[type=submit] with selector or text matching'
  },
  NAVIGATION: {
    BASE_URL: 'Base url should be a valid absolute url.',
    ROOT: 'Please provide "driver.baseUrl" or set BASE_URL in your env to use root function.'
  }
};
module.exports = exports['default'];