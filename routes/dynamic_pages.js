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

            var data = {
              id: id,
              newGame: true,
              game_name: "unnamed"
            };

            reply.view('dynamic_pages/game', data).code(200);
          } else {
            reply.redirect('/?message=Please Sign In First').code(307);
          }
        });
      }
    },
    { // Show game page
      method: 'GET',
      path: '/game/{game_id}',
      handler: function(request, reply){
        Authenticated(request, function(result){
          if (result.authenticated) {
            var db       = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            var id = request.params.game_id.length === 24 ? ObjectID(request.params.game_id) : null;

            if (id === null) {
              reply.redirect("/setup/?message=No Game Found");
            } else {
              db.collection('savegames').findOne({ _id: id }, function(err, result){
                if (err) { return reply(err).code(400); }

                var data = {
                  id: id,
                  newGame: false,
                  game_name: result.game_name
                };

                reply.view('dynamic_pages/game', data).code(200);
              });
            }
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
