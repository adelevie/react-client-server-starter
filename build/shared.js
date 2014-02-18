/** @jsx React.DOM */

var React = require('react');
var bs = require('./bootstrap.js');
var _ = require('lodash');

var getPages = function() {
  var pages = [
    {name: "Home", route: "/"},
    {name: "About", route: "/about"},
    {name: "Contact", route: "/contact"},
    {name: "Dev Center", route: "/developers"}
  ];
  _.each(pages, function(page) {
    _.defaults(page, {serverHandler: null, clientHandler: null});
  });
  return _.cloneDeep(pages);
}; 



var pageByName = function(myPages, name) {
  return _.find(myPages, {name: name});
};

var Widget = React.createClass({displayName: 'Widget',
  render: function() {
    return (
      React.DOM.p(null, "Rendered from the ", this.props.clientOrServer,". Data: ", this.props.foo)
    );
  }
});

module.exports.getPages = getPages;
module.exports.pageByName = pageByName;
module.exports.Widget = Widget;
module.exports.bs = bs;
