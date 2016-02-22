var Authenticated = require("./modules/authenticated");

exports.register = function (server, options, next) {
  server.route([
    { // Show save games page
      method: 'GET',
      path: '/setup',
      handler: function(request, reply){
        Authenticated(request, function(result){
          if (result.authenticated) {
            reply.view('dynamic_pages/setup').code(200);
          } else {
            reply.redirect('/?message=Please Sign In First').code(307);
          }
        });
      }
    },
    { // Show game page
      method: 'GET',
      path: '/game',
      handler: function(request, reply){
        Authenticated(request, function(result){
          if (result.authenticated) {
            var db       = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            var id = new ObjectID();

            reply.view('dynamic_pages/game', {id: id, newGame: true}).code(200);
          } else {
            reply.redirect('/?message=Please Sign In First').code(307);
          }
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'games-pages-views',
  version: '0.0.1'
};
