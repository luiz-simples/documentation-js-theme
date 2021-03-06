'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var Utils = require('../../utils');

var Example = function Example(_ref) {
  var caption = _ref.caption,
      content = _ref.content,
      utils = _ref.utils;

  var renderedCaption = void 0;

  if (caption) {
    renderedCaption = React.createElement('p', { dangerouslySetInnerHTML: { __html: utils.md(caption) } });
  }

  var rendered = {
    __html: utils.highlight(content)
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h4',
      null,
      'Example'
    ),
    renderedCaption,
    React.createElement(
      'pre',
      null,
      React.createElement('code', {
        dangerouslySetInnerHTML: rendered })
    )
  );
};

Example.propTypes = {
  caption: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(Example);