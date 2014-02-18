/** @jsx React.DOM */

var React = require('react');
var bs = require('./bootstrap.js');


var Widget = React.createClass({
  render: function() {
    return (
      <p>Rendered from the {this.props.clientOrServer}. Data: {this.props.foo}</p>
    );
  }
});

module.exports.Widget = Widget;
module.exports.bs = bs;