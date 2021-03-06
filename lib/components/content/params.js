'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var Utils = require('../../utils');
var Param = require('./param');

var Params = function Params(_ref) {
  var params = _ref.params,
      utils = _ref.utils;

  if (!params || !params.length) {
    return null;
  }

  var listStyle = {
    listStyle: 'none',
    marginLeft: 0,
    paddingLeft: 0
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h4',
      null,
      'Parameters'
    ),
    React.createElement(
      'ol',
      { style: listStyle },
      params.map(function (param) {
        return React.createElement(Param, {
          key: param.name,
          name: param.name,
          typeVal: param.type,
          defaultVal: param.default,
          description: param.description,
          properties: param.properties,
          utils: utils });
      })
    )
  );
};

Params.propTypes = {
  params: PropTypes.array,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(Params);