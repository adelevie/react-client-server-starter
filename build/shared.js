/** @jsx React.DOM */

var React = require('react');
var bs = require('./bootstrap.js');
var _ = require('lodash');

var render = function(response, component) {
  React.renderComponentToString(component, function(markup) {
    response.send(markup); 
  });
};

var Layout = bs.Layout;
var Widget = bs.Widget;

var pages = [
  {
    route: '/',
    client: function(params) {
      console.log('hellurr');
    },
    server: function(req, res, params) {
      var component = (
        Layout(null, 
          React.DOM.h4(null, "Home"),
          React.DOM.p(null, React.DOM.div( {id:"client"} ))
        )
      );
      render(res, component);       
    }
  },
  {
    route: '/posts/:id',
    client: function(params) { 
      React.renderComponent(
        Widget( {clientOrServer:"client", postId:params.id} ),
        document.getElementById('client')
      );
    },
    server: function(req, res) { 
      var component = (
        Layout(null, 
          React.DOM.p(null, "From server:",Widget( {clientOrServer:"server", postId:req.params.id} )),
          React.DOM.p(null, "From client:",React.DOM.div( {id:"client"} ))
        )
      );
      render(res, component); 
    }
  }
];

var clientRoutes = _.map(pages, function(page) {
  return _.omit(page, ['server']);
});

var serverRoutes = _.map(pages, function(page) {
  return _.omit(page, ['client']);
});

module.exports.bs = bs;
module.exports.serverRoutes = serverRoutes;
module.exports.clientRoutes = clientRoutes;