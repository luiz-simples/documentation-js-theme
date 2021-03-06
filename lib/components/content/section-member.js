'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var Utils = require('../../utils');
var Signature = require('./signature');
var Description = require('./description');
var Examples = require('./examples');
var Params = require('./params');
var SourceLink = require('./source-link');
var Returns = require('./returns');
var Throws = require('./throws');
var Extends = require('./extends');
var See = require('./see');

var _require = require('../styles'),
    lineHeight = _require.lineHeight;

var SectionMember = function SectionMember(_ref) {
  var namespace = _ref.namespace,
      name = _ref.name,
      description = _ref.description,
      member = _ref.member,
      parent = _ref.parent,
      utils = _ref.utils;

  var displayParent = void 0;

  if (parent) {
    displayParent = parent + '.';
  }

  var displayName = displayParent + name;
  if (name === 'constructor') {
    displayName = name;
  }

  var style = {
    marginBottom: lineHeight(2)
  };

  return React.createElement(
    'div',
    { style: style },
    React.createElement('hr', null),
    React.createElement(
      'h3',
      null,
      React.createElement('a', { className: 'anchor', name: utils.slug(namespace) }),
      displayName,
      React.createElement(SourceLink, { context: member.context })
    ),
    React.createElement(Description, {
      content: description,
      utils: utils
    }),
    React.createElement(Signature, { member: member, utils: utils }),
    React.createElement(Extends, { list: member.augments, utils: utils }),
    React.createElement(Params, { params: member.params, utils: utils }),
    React.createElement(Returns, { list: member.returns, utils: utils }),
    React.createElement(Throws, { list: member.throws, utils: utils }),
    React.createElement(Examples, { list: member.examples, utils: utils }),
    React.createElement(See, { tags: member.tags, utils: utils })
  );
};

SectionMember.propTypes = {
  namespace: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  member: PropTypes.object,
  parent: PropTypes.string.isRequired,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(SectionMember);