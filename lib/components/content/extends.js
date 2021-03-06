'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var Utils = require('../../utils');

var Extends = function Extends(_ref) {
  var list = _ref.list,
      utils = _ref.utils;

  if (!list || !list.length) {
    return null;
  }

  var wrapperStyle = {
    display: 'inline'
  };

  var supers = {
    __html: list.map(function (sup) {
      return utils.autolink(sup.name);
    }).join(', ') + '.'
  };

  return React.createElement(
    'div',
    { style: wrapperStyle },
    React.createElement(
      'span',
      null,
      ' Extends '
    ),
    React.createElement('span', { dangerouslySetInnerHTML: supers })
  );
};

Extends.propTypes = {
  list: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(Extends);