/** @jsx React.DOM */

var React = require('react');
var bs = require('./bootstrap.js');


var Widget = React.createClass({displayName: 'Widget',
  render: function() {
    return (
      React.DOM.p(null, "Rendered from the ", this.props.clientOrServer,". Data: ", this.props.foo)
    );
  }
});

module.exports.Widget = Widget;
module.exports.bs = bs;