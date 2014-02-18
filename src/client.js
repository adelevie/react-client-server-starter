/** @jsx React.DOM */

var shared = require('./shared.js');
var React = require('react');

/* app-specific */
var Widget = shared.Widget;
var _ = require('lodash');

var defaultPageHandler = function() {
  console.log('Default Javascript goes here.');
  React.renderComponent(
    <Widget foo="bar" clientOrServer="client" />,
    document.getElementById('client')
  );
};

var pages = shared.getPages();
var pageByName = shared.pageByName;
pageByName(pages, "Home").clientHandler = defaultPageHandler;
pageByName(pages, "About").clientHandler = defaultPageHandler;
pageByName(pages, "Contact").clientHandler = defaultPageHandler;
pageByName(pages, "Dev Center").clientHandler = defaultPageHandler;
/* end app-specific */

/* "Framework" */

_.each(pages, function(page) {
  if (window.location.pathname === page.route) {
    page.clientHandler();
  }
});

/* end "Framework" */