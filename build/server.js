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

var Widget = shared.Widget;

var render = function(response, component) {
  React.renderComponentToString(component, function(markup) {
    response.send(markup);
  });
};

var Layout = shared.bs.Layout;

var pages = [
  {name: "Home", route: "/"},
  {name: "About", route: "/about"},
  {name: "Contact", route: "/contact"},
  {name: "Dev Center", route: "/developers"}
];

var makeActiveByPageName = function(myPages, pageName) {
  var pagesCopy = myPages;
  _.each(myPages, function(page) {
    page.active = false;
  });
  _.find(pagesCopy, {name: pageName}).active = true;
  console.log(pageName);
  console.log(pagesCopy);
  return pagesCopy;
}

app.get('/', function(request, response) {
  var myPages = makeActiveByPageName(pages, "Home");
  var component = (
    Layout( {navPages:myPages}, 
      Widget( {clientOrServer:"server", foo:"bar"} ),
      React.DOM.div( {id:"client"} )
    )
  );
  render(response, component);
});

app.get('/about', function(request, response) {
  var myPages = makeActiveByPageName(pages, "About");
  var component = (
    Layout( {navPages:myPages}, 
      Widget( {clientOrServer:"server", foo:"bar"} ),
      React.DOM.div( {id:"client"} )
    )
  );
  render(response, component);
});

app.get('/contact', function(request, response) {
  var myPages = makeActiveByPageName(pages, "Contact");
  var component = (
    Layout( {navPages:myPages}, 
      Widget( {clientOrServer:"server", foo:"bar"} ),
      React.DOM.div( {id:"client"} )
    )
  );
  render(response, component);
});

app.get('/developers', function(request, response) {
  var myPages = makeActiveByPageName(pages, "Dev Center");
  var component = (
    Layout( {navPages:myPages}, 
      Widget( {clientOrServer:"server", foo:"bar"} ),
      React.DOM.div( {id:"client"} )
    )
  );
  render(response, component);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});