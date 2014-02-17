/** @jsx React.DOM */

var express = require('express');
var app = express();
app.use(express.logger());
var React = require('react');
var shared = require('./shared.js');
var _ = require('lodash');

app.get('/client.js', function(request, response) {
  response.sendfile('build/client.js');
});

var Layout = shared.Layout;
var Widget = shared.Widget;
var myData = shared.myData;
var clientOrServer = shared.clientOrServer;

var render = function(response, component) {
  React.renderComponentToString(component, function(markup) {
    response.send(markup);
  });
};

app.get('/foo', function(request, response) {
  var component = (
    Layout(null, 
      Widget( {foo:myData.foo, clientOrServer:clientOrServer()} )
    )
  );
  render(response, component);
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});