/** @jsx React.DOM */

var shared = require('./shared.js');
var React = require('react');

var Widget = shared.Widget;

React.renderComponent(
  <Widget foo="bar" clientOrServer="client" />,
  document.getElementById('client')
);

var foo = function() {
  console.log('This function only is executed on the /foo route.');
}
var page = require('page');
page('/foo', foo);
page();