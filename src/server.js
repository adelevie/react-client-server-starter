/** @jsx React.DOM */

var express = require('express');
var app = express();
app.use(express.logger());
var React = require('react');
var _ = require('lodash');

var shared = require('./shared.js');
var serverRoutes = shared.serverRoutes;
var Router = require('routes');
var router = Router();


app.get('/client.js', function(request, response) {
  response.sendfile('build/client.js');
});

_.each(serverRoutes, function(serverRoute) {
  router.addRoute(serverRoute.route, serverRoute.server);
});

app.get('/*', function(req, res) {
  var route = router.match(req.url);
  req.params = route.params;
  route.fn(req, res);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});