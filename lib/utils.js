'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GithubSlugger = require('github-slugger');
var hljs = require('highlight.js');
var util = require('documentation').util;
var createFormatters = util.createFormatters;
var LinkerStack = util.LinkerStack;
var _ = require('lodash');

module.exports = function () {
  function Utils(options, comments) {
    _classCallCheck(this, Utils);

    this.linkerStack = new LinkerStack(options).namespaceResolver(comments, function (namespace) {
      var slugger = new GithubSlugger();
      return '#' + slugger.slug(namespace);
    });

    this.options = options;
    this.comments = comments;
    this.formatters = createFormatters(this.linkerStack.link);
    this.options.hljs = this.options.hljs || {};

    hljs.configure(this.options.hljs);

    this.formatType = this.formatters.type;
    this.autolink = this.formatters.autolink;
  }

  _createClass(Utils, [{
    key: 'md',
    value: function md(ast, inline) {
      if (inline && ast && ast.children.length && ast.children[0].type === 'paragraph') {
        ast = {
          type: 'root',
          children: ast.children[0].children.concat(ast.children.slice(1))
        };
      }
      return this.formatters.markdown(ast);
    }
  }, {
    key: 'highlight',
    value: function highlight(code) {
      if (this.options.hljs && this.options.hljs.highlightAuto) {
        return hljs.highlightAuto(code).value;
      }
      return hljs.highlight('js', code).value;
    }
  }, {
    key: 'signature',
    value: function signature(section) {
      var returns = '';
      var prefix = '';

      if (section.kind === 'class') {
        prefix = 'new ';
      } else if (section.kind !== 'function') {
        var type = getType(section);
        if (type) {
          return section.name + ': ' + this.formatType(type);
        }

        return section.name;
      }

      if (section.returns && section.returns.length > 0) {
        returns = ': ' + this.formatType(section.returns[0].type);
      }

      return prefix + section.name + this.formatters.parameters(section) + returns;
    }
  }, {
    key: 'slug',
    value: function slug(str) {
      var slugger = new GithubSlugger();
      return slugger.slug(str);
    }
  }]);

  return Utils;
}();

function getType(section) {
  if (!section.tags) {
    return;
  }

  var tag = _.find(section.tags, function (tag) {
    return tag.title === 'type';
  });

  if (!tag) {
    return;
  }

  return tag.type;
}