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

var Layout = React.createClass({displayName: 'Layout',
  render: function() {
    return (
      React.DOM.html(null, 
        React.DOM.head(null, 
          React.DOM.title(null, "Hello React")
        ),
        React.DOM.body(null, 
          React.DOM.h3(null, "Title"),
          React.DOM.div( {id:"client"} ),
          React.DOM.div( {id:"server"}, 
            this.props.children
          ),
          React.DOM.script( {src:"/client.js"} )
        )
      )
    );
  }
});

var Widget = React.createClass({displayName: 'Widget',
  render: function() {
    return (
      React.DOM.p(null, "Rendered from the ", this.props.clientOrServer,". Data: ", this.props.foo)
    );
  }
});

module.exports.Layout = Layout;
module.exports.Widget = Widget;
module.exports.myData = myData;
module.exports.clientOrServer = clientOrServer;