/** @jsx React.DOM */

var shared = require('./shared.js');
var React = require('react');

var Widget = shared.Widget;
var myData = shared.myData;
var clientOrServer = shared.clientOrServer;

React.renderComponent(
  <Widget foo={myData.foo} clientOrServer={clientOrServer()} />,
  document.getElementById('client')
);