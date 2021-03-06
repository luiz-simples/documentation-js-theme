'use strict';

var React = require('react');
var Radium = require('radium');
var PropTypes = require('prop-types');

var Utils = require('../../utils');
var SectionGroup = require('./section-group');
var SourceLink = require('./source-link');
var Extends = require('./extends');
var See = require('./see');
var Params = require('./params');
var Examples = require('./examples');
var Returns = require('./returns');
var Throws = require('./throws');

var Section = function Section(_ref) {
  var name = _ref.name,
      namespace = _ref.namespace,
      description = _ref.description,
      section = _ref.section,
      utils = _ref.utils;

  var members = section.members;
  var memberTypes = ['static', 'instance', 'events'].filter(function (key) {
    return members[key] && members[key].length > 0;
  });

  return React.createElement(
    'section',
    null,
    React.createElement(
      'h1',
      null,
      React.createElement('a', { className: 'anchor', name: utils.slug(namespace) }),
      name,
      React.createElement(SourceLink, { context: section.context })
    ),
    React.createElement('div', { dangerouslySetInnerHTML: { __html: utils.md(description) } }),
    React.createElement(Extends, { list: section.augments, utils: utils }),
    React.createElement(Params, { params: section.params, utils: utils }),
    React.createElement(Returns, { list: section.returns, utils: utils }),
    React.createElement(Throws, { list: section.throws, utils: utils }),
    React.createElement(Examples, { list: section.examples, utils: utils }),
    React.createElement(See, { tags: section.tags, utils: utils }),
    memberTypes.map(function (type, i) {
      return React.createElement(SectionGroup, {
        key: i,
        name: type,
        utils: utils,
        parent: name,
        members: members[type] });
    })
  );
};

Section.propTypes = {
  name: PropTypes.string.isRequired,
  namespace: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  section: PropTypes.object,
  utils: PropTypes.instanceOf(Utils).isRequired
};

module.exports = Radium(Section);