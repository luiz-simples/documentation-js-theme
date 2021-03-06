'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var Utils = require('../../utils');

var Throws = function Throws(_ref) {
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
      'Throws'
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

Throws.propTypes = {
  list: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(Throws);