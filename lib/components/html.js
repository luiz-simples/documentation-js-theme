'use strict';

var React = require('react');

var _require = require('radium'),
    Style = _require.Style;

var _require2 = require('./styles'),
    sansSerifFont = _require2.sansSerifFont,
    textColor = _require2.textColor,
    lineHeight = _require2.lineHeight;

var bodyStyle = {
  body: {
    margin: 0,
    padding: 0,
    color: textColor,
    fontFamily: sansSerifFont,
    fontWeight: 300,
    lineHeight: lineHeight(),
    fontSize: '17px'
  },
  '*': {
    boxSizing: 'border-box'
  }
};

module.exports = function (_ref) {
  var name = _ref.name,
      content = _ref.content;

  return React.createElement(
    'html',
    null,
    React.createElement(
      'head',
      null,
      React.createElement('meta', { charSet: 'utf-8' }),
      React.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      React.createElement(
        'title',
        null,
        name,
        ' - Documenta\xE7\xE3o'
      ),
      React.createElement('link', { href: 'https://fonts.googleapis.com/css?family=Roboto+Mono:400,500|Roboto:300,500,700', rel: 'stylesheet' }),
      React.createElement(Style, { rules: bodyStyle })
    ),
    React.createElement(
      'body',
      null,
      React.createElement('main', { id: 'app', dangerouslySetInnerHTML: { __html: content } })
    )
  );
};