'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var Utils = require('../../utils');

var Returns = function Returns(_ref) {
  var list = _ref.list,
      utils = _ref.utils;

  if (!list || !list.length) {
    return null;
  }

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h4',
      null,
      'Returns'
    ),
    list.map(function (ret, i) {
      return React.createElement(
        'div',
        { key: i },
        React.createElement('code', { dangerouslySetInnerHTML: { __html: utils.formatType(ret.type) } }),
        ret.description ? React.createElement('span', {
          dangerouslySetInnerHTML: {
            __html: ' ' + utils.md(ret.description, true)
          } }) : null
      );
    })
  );
};

Returns.propTypes = {
  list: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(Returns);