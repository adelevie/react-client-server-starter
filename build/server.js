/** @jsx React.DOM */

/* "Framework" */

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

var serveWithNavPagesAndLayout = _.curry(function(navPages, layout, method, route, pageName, callback) {
  var makeActiveByPageName = function(myPages, pageName) {
    var pages = shared.getPages();
    _.each(pages, function(page) {
      page.active = false;
    });
    _.find(pages, {name: pageName}).active = true;
    return _.cloneDeep(pages);
  };  

  app[method](route, function(request, response) {
    var navPagesCopy = makeActiveByPageName(navPages, pageName);
    var children = callback(request, response);
    var component = layout({navPages: navPagesCopy}, children);
    render(response, component);
  });
});

/* end "Framework" */

/* app-specific */
var Layout = shared.bs.Layout;

var defaultPageHandler = function(request, response) {
  return (
    React.DOM.div(null, 
      React.DOM.p(null, "Home!"),
      Widget( {foo:"bar", clientOrServer:"server"} ),
      React.DOM.div( {id:"client"} )
    )
  );
};

var homePageHandler = function(request, response) {
  return (
    React.DOM.div(null, 
      React.DOM.p(null, "Home"),
      Widget( {foo:"bar", clientOrServer:"server"} ),
      React.DOM.div( {id:"client"} )
    )
  );
};

var aboutPageHandler = function(request, response) {
  return (
    React.DOM.div(null, 
      React.DOM.p(null, "About"),
      Widget( {foo:"bar", clientOrServer:"server"} ),
      React.DOM.div( {id:"client"} )
    )
  );
};
var contactPageHandler = function(request, response) {
  return (
    React.DOM.div(null, 
      React.DOM.p(null, "Contact"),
      Widget( {foo:"bar", clientOrServer:"server"} ),
      React.DOM.div( {id:"client"} )
    )
  );
};

var developersPageHandler = function(request, response) {
  return (
    React.DOM.div(null, 
      React.DOM.p(null, "Dev Center"),
      Widget( {foo:"bar", clientOrServer:"server"} ),
      React.DOM.div( {id:"client"} )
    )
  );
};

var pages = shared.getPages();
var pageByName = shared.pageByName;
pageByName(pages, "Home").serverHandler = homePageHandler;
pageByName(pages, "About").serverHandler = aboutPageHandler;
pageByName(pages, "Contact").serverHandler = contactPageHandler;
pageByName(pages, "Dev Center").serverHandler = developersPageHandler;

/* end app-specific */

var serve = serveWithNavPagesAndLayout(pages)(Layout);

_.each(pages, function(page) {
  serve('get')(page.route)(page.name)(page.serverHandler)
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});