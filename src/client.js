/** @jsx React.DOM */
var shared = require('./shared.js');
var React = require('react');
var _ = require('lodash');

var Router = require('routes');
var router = Router();
var clientRoutes = shared.clientRoutes;

_.each(clientRoutes, function(clientRoute) {
  router.addRoute(clientRoute.route, clientRoute.client);
});

var route = router.match(window.location.pathname);
route.fn(route.params);
