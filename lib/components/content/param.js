'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var Utils = require('../../utils');
var Type = require('./type');

var _require = require('../styles'),
    lineHeight = _require.lineHeight;

var ListItem = Radium(function (_ref) {
  var name = _ref.name,
      val = _ref.val,
      defaultVal = _ref.defaultVal,
      description = _ref.description,
      utils = _ref.utils;

  var descriptionStyle = {
    display: 'inline-block'
  };
  var liStyle = {
    paddingBottom: lineHeight(0.5)
  };

  return React.createElement(
    'li',
    { style: liStyle },
    React.createElement(Type, {
      name: name,
      val: val,
      defaultVal: defaultVal,
      utils: utils }),
    ': \xA0',
    React.createElement('div', {
      style: descriptionStyle,
      dangerouslySetInnerHTML: { __html: utils.md(description, true) } })
  );
});

var Param = function Param(_ref2) {
  var name = _ref2.name,
      typeVal = _ref2.typeVal,
      defaultVal = _ref2.defaultVal,
      description = _ref2.description,
      properties = _ref2.properties,
      utils = _ref2.utils;

  var propertyList = void 0;

  if (properties && properties.length > 0) {
    propertyList = properties.map(function (p) {
      return React.createElement(ListItem, {
        key: p.name,
        name: p.name,
        val: p.type,
        defaultVal: p.default,
        description: p.description,
        utils: utils });
    });
  }

  return React.createElement(
    'div',
    null,
    React.createElement(ListItem, {
      key: '1',
      name: name,
      val: typeVal,
      defaultVal: defaultVal,
      description: description,
      utils: utils }),
    propertyList
  );
};

Param.propTypes = {
  name: PropTypes.string.isRequired,
  typeVal: PropTypes.any,
  defaultVal: PropTypes.string,
  description: PropTypes.object,
  properties: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(Param);