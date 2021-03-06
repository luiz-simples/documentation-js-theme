'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');
var Utils = require('../utils');

var _require = require('./styles'),
    lineHeight = _require.lineHeight,
    sansSerifFont = _require.sansSerifFont,
    textColor = _require.textColor,
    lightGray = _require.lightGray;

var Member = Radium(function (_ref) {
  var name = _ref.name,
      namespace = _ref.namespace,
      utils = _ref.utils;

  var linkStyle = {
    fontFamily: sansSerifFont,
    fontWeight: 300,
    fontSize: '13px',
    lineHeight: '16px',
    textDecoration: 'none',
    color: '#555'
  };

  return React.createElement(
    'li',
    null,
    React.createElement(
      'a',
      { href: '#' + utils.slug(namespace || name), style: linkStyle },
      name
    )
  );
});

Member.propTypes = {
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string,
  utils: PropTypes.instanceOf(Utils).isRequired
};

var Members = Radium(function (_ref2) {
  var items = _ref2.items,
      name = _ref2.name,
      first = _ref2.first,
      utils = _ref2.utils;

  var style = {
    paddingTop: first ? 0 : lineHeight(0.5)
  };

  var listStyle = {
    listStyle: 'none',
    paddingLeft: 0
  };

  var nameStyle = {
    textTransform: 'uppercase',
    fontSize: '13px',
    lineHeight: '18px',
    color: '#666'
  };

  return React.createElement(
    'div',
    { style: style },
    React.createElement(
      'span',
      { style: nameStyle },
      name
    ),
    React.createElement(
      'ul',
      { style: listStyle },
      items.map(function (member, i) {
        return React.createElement(Member, {
          key: i,
          name: member.name,
          namespace: member.namespace,
          utils: utils });
      })
    )
  );
});

Members.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
  first: PropTypes.bool.isRequired,
  utils: PropTypes.instanceOf(Utils).isRequired
};

var Item = Radium(function (_ref3) {
  var name = _ref3.name,
      members = _ref3.members,
      last = _ref3.last,
      namespace = _ref3.namespace,
      utils = _ref3.utils;

  var membersElements = [];

  var isFirst = function isFirst() {
    return membersElements.length === 0;
  };

  if (members) {
    var keyCounter = 0;
    if (members.static && members.static.length > 0) {
      membersElements.push(React.createElement(Members, {
        key: keyCounter++,
        name: 'Static',
        items: members.static,
        first: isFirst(),
        utils: utils }));
    }

    if (members.instance && members.instance.length > 0) {
      membersElements.push(React.createElement(Members, {
        key: keyCounter++,
        name: 'Instance',
        items: members.instance,
        first: isFirst(),
        utils: utils }));
    }

    if (members.events && members.events.length > 0) {
      membersElements.push(React.createElement(Members, {
        name: 'Events',
        key: keyCounter++,
        items: members.events,
        first: isFirst(),
        utils: utils }));
    }
  }

  var style = {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: lineHeight(0.5),
    paddingBottom: lineHeight(0.5)
  };

  var itemStyle = {
    borderBottom: last && !members ? 'none' : '1px solid ' + lightGray
  };

  var membersStyle = {
    borderBottom: last && members ? 'none' : '1px solid ' + lightGray

  };
  return React.createElement(
    'div',
    null,
    React.createElement(
      'li',
      { style: [style, itemStyle] },
      React.createElement(
        'a',
        { style: { color: textColor }, href: '#' + utils.slug(namespace || name) },
        name
      )
    ),
    members ? React.createElement(
      'li',
      { style: [style, membersStyle] },
      membersElements
    ) : null
  );
});

Item.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.object,
  last: PropTypes.bool.isRequired,
  namespace: PropTypes.string,
  utils: PropTypes.instanceOf(Utils).isRequired
};

var Nav = function Nav(_ref4) {
  var items = _ref4.items,
      utils = _ref4.utils;

  var style = {
    borderRadius: '4px',
    border: '1px solid ' + lightGray,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: lineHeight(),
    fontFamily: sansSerifFont,
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '18px',
    maxHeight: '70vh',
    overflowX: 'auto'
  };

  var listStyle = {
    listStyle: 'none',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0
  };

  return React.createElement(
    'div',
    { style: style },
    React.createElement(
      'ul',
      { style: listStyle },
      items.map(function (doc, i) {
        return React.createElement(Item, {
          key: i,
          name: doc.name,
          members: doc.members,
          namespace: doc.namespace,
          last: i === items.length - 1,
          utils: utils });
      })
    )
  );
};

Nav.propTypes = {
  items: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(Nav);