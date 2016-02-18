var Authenticated = require("./modules/Authenticated.js");

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'GET',
      path: '/signup',
      handler: function (request, reply) {
        Authenticated(request, function (result) {
          // if already signed in, redirect to your main collection page
          if (result.authenticated) {
            reply.redirect('/dominion'); // CHANGE-ME
          } else {
            reply.view('auth/signup', {message: request.query.message});
          }
        });
      }
    },
    {
      method: 'GET',
      path: '/signin',
      handler: function (request, reply) {
        Authenticated(request, function (result) {
          // if already signed in, redirect to your main collection page
          if (result.authenticated) {
            reply.redirect('/dominion'); // CHANGE-ME
          } else {
            reply.view('auth/signin', {message: request.query.message});
          }
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'auth-views',
  version: '0.0.1'
};
