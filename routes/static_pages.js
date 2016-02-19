var Authenticated = require("./modules/Authenticated.js");

exports.register = function (server, options, next) {
  server.route([
    { // serving static files
      method: 'GET',
      path: "/public/{path*}",
      handler: {
        directory: {
          path: 'public'
        }
      }
    },
    { // Home Page
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        Authenticated(request, function (result) {
          var data = result; // need to have authenticated inorder to show signout button
          if (data.authenticated) {
            reply.redirect('/setup').code(307);
          } else {
            console.log(data);
            reply.view('static_pages/home', data).code(200);
          }
        });
      }
    },
  ]);

  next();
};

exports.register.attributes = {
  name: 'static-pages-views',
  version: '0.0.1'
};
