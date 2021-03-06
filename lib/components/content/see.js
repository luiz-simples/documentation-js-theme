'use strict';

var React = require('react');
var Radium = require('radium');
var remark = require('remark')();
var PropTypes = require('prop-types');

var Utils = require('../../utils');

var See = function See(_ref) {
  var tags = _ref.tags,
      utils = _ref.utils;

  if (!tags || !tags.length) {
    return null;
  }

  var list = tags.filter(function (tag) {
    return tag.title === 'see';
  });

  if (!list.length) {
    return null;
  }

  var wrapperStyle = {
    display: 'inline'
  };

  return React.createElement(
    'div',
    { style: wrapperStyle },
    React.createElement(
      'h4',
      null,
      'See'
    ),
    React.createElement(
      'ul',
      null,
      list.map(function (link, i) {
        return React.createElement(
          'li',
          { key: i },
          React.createElement('div', {
            dangerouslySetInnerHTML: {
              __html: utils.md(remark.parse(link.description))
            } })
        );
      })
    )
  );
};

See.propTypes = {
  tags: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(See);