'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var _require = require('../styles'),
    lineHeight = _require.lineHeight;

var Utils = require('../../utils');

var Description = function Description(_ref) {
  var content = _ref.content,
      utils = _ref.utils;

  if (!content) return null;

  var rendered = { __html: utils.md(content) };

  var style = {
    marginTop: lineHeight(0.5),
    marginBottom: lineHeight(0.5)
  };

  return React.createElement('p', {
    dangerouslySetInnerHTML: rendered,
    style: style
  });
};

Description.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(Description);