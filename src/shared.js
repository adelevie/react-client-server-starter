/** @jsx React.DOM */

var React = require('react');
var Showdown = require('showdown');
var converter = new Showdown.converter();
var $ = require('jquery');

var myData = {foo: 'bar'};

var clientOrServer = function() {
  if (typeof window === 'undefined') {
    return "server";
  } else {
    return "client";
  }
};

var Layout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>Hello React</title>
        </head>
        <body>
          <h3>Title</h3>
          <div id="client" />
          <div id="server">
            {this.props.children}
          </div>
          <script src="/client.js" />
        </body>
      </html>
    );
  }
});

var Widget = React.createClass({
  render: function() {
    return (
      <p>Rendered from the {this.props.clientOrServer}. Data: {this.props.foo}</p>
    );
  }
});

module.exports.Layout = Layout;
module.exports.Widget = Widget;
module.exports.myData = myData;
module.exports.clientOrServer = clientOrServer;