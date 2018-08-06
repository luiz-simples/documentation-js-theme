'use strict';

var React = require('react');
var Radium = require('radium');
var Header = require('./header');
var Nav = require('./navigation');
var Content = require('./content');

var _require = require('./styles'),
    lineHeight = _require.lineHeight;

var Utils = require('../utils');
var StyleRoot = Radium.StyleRoot;

var _require2 = require('radium-bootstrap-grid'),
    Container = _require2.Container,
    Column = _require2.Column,
    Row = _require2.Row;

var hasMembers = function hasMembers(doc) {
  var m = doc.members;
  return m.static.length > 0 || m.instance.length > 0 || m.events && m.events.length > 0;
};

var App = function App(_ref) {
  var options = _ref.options,
      docs = _ref.docs;

  var containerStyle = {
    paddingTop: lineHeight(4)
  };

  var navItems = docs.map(function (doc) {
    return {
      name: doc.name,
      members: hasMembers(doc) ? doc.members : null
    };
  });

  var utils = new Utils(options, docs);
  var radiumConfig = {
    userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
  };
  return React.createElement(
    StyleRoot,
    { radiumConfig: radiumConfig },
    React.createElement(Header, {
      name: options.name,
      version: options.version,
      project: options.project }),
    React.createElement(
      Container,
      { style: containerStyle },
      React.createElement(
        Row,
        null,
        React.createElement(
          Column,
          { lg: 3, md: 3, sm: 3, ms: 3, xs: 3 },
          React.createElement(Nav, {
            items: navItems,
            utils: utils
          })
        ),
        React.createElement(
          Column,
          { lg: 9, md: 9, sm: 9, ms: 9, xs: 9 },
          React.createElement(Content, {
            docs: docs,
            utils: utils
          })
        )
      )
    )
  );
};

module.exports = Radium(App);