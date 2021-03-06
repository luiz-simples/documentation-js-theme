'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var GoCode = require('react-icons/lib/go/code');

var SourceLink = function SourceLink(_ref) {
  var context = _ref.context;

  if (!context || !context.github) {
    return null;
  }

  var style = {
    float: 'right'
  };

  return React.createElement(
    'a',
    {
      href: context.github.url,
      title: context.github.path,
      style: style },
    React.createElement(GoCode, null)
  );
};

SourceLink.propTypes = {
  context: PropTypes.object
};

module.exports = Radium(SourceLink);