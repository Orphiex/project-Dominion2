var Joi   = require('joi');
var Auth  = require('../modules/authenticated');

exports.register = function(server, options, next){
  server.route([
    { // Get savegames belonging to a specific user
      method: 'GET',
      path: '/api/savegames',
      handler: function(request, reply){
        Auth(request, function (result){
          if (result.authenticated){
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

            var user_id = ObjectID(result.user._id);

            db.collection('savegames').find({ user_id: user_id }).toArray(function(err, savegames){
              if (err) { return reply(err).code(400); }

              reply(savegames).code(200);
            });
          } else {
            reply(result).code(400);
          }
        });
      }
    },
    { // Get one savegame
      method: 'GET',
      path: '/api/savegames/{savegame_id}',
      handler: function(request, reply){
        Auth(request, function (result){
          if (result.authenticated){
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

            var user_id = ObjectID(result.user._id);
            var savegame_id = request.params.savegame_id.length === 24 ? ObjectID(request.params.savegame_id) : null;

            db.collection('savegames').findOne({ "_id": savegame_id, user_id: user_id }, function(err, savegame){
              if (err) { return reply(err).code(400); }

              if (savegame === null){
                return reply({message: "No game found"}).code(404);
              }

              reply(savegame).code(200);
            });
          } else {
            reply(result).code(400);
          }
        });
      }
    },
    { // Create save game file
      method: 'POST',
      path: '/api/savegames',
      handler: function(request, reply){
        Auth(request, function(result){
          if (result.authenticated) {
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            var session = request.yar.get('hapi_dominion_session');

            var payload = JSON.parse(request.payload.jsonString);

            var gameState = {
              "_id": ObjectID(payload.savegame_id),
              user_id: ObjectID(session.user_id),
              game_name: payload.game_name,
              player_1: payload.player_1,
              player_2: payload.player_2,
              shop: payload.shop,
              turn: payload.turn
            };

            db.collection('savegames').insert(gameState, function (err, doc){
              if (err) { return reply(err).code(400); }
              reply(doc.ops[0]).code(200);
            });
          } else {
            reply(result).code(400);
          }
        });
      }
    },
    { // Delete savegame
      method: 'DELETE',
      path: '/api/savegames/{id}',
      handler: function(request, reply){
        Auth(request, function(result){
          if (result.authenticated){ // Logged in
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            var session = request.yar.get('hapi_dominion_session');

            var id      = ObjectID(request.params.id);
            var user_id = ObjectID(session.user_id);

            // Find the savegame file
            db.collection('savegames').findOne({ '_id': id }, function(err, savegame){
              if (err) { return reply(err).code(400); }

              // Check if this savegame exists
              if (savegame === null) {
                return reply({ message: 'There is no such saved game.' }).code(404);
              }
              // If savegame file's user_id is the same as current user then remove savegame file
              if (savegame.user_id.toString() === user_id.toString()){ // Your savegame
                db.collection('savegames').remove({ '_id': id }, function (err, doc){
                  if (err) { return reply(err).code(400); }
                  reply(doc).code(200);
                });
              } else { // Not your savegame
                reply({ message: "This is not the saved game you're looking for."}).code(400);
              }
            });
          } else { // Not logged in
            reply(result).code(400);
          }
        });
      }
    },
    { // Update save game
      method: 'PUT',
      path: '/api/savegames/{id}',
      handler: function(request, reply){
        Auth(request, function(result){
          if (result.authenticated){
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            var session = request.yar.get('hapi_dominion_session');
            var id = ObjectID(request.params.id);
            var user_id = ObjectID(session.user_id);

            var payload = JSON.parse(request.payload.jsonString);

            var gameState = {
              game_name: payload.game_name,
              player_1: payload.player_1,
              player_2: payload.player_2,
              shop: payload.shop,
              turn: payload.turn
            };

            db.collection('savegames').findOne({ '_id': id }, function(err, savegame){
              if (err) { return reply(err).code(400); }

              // Check if savegame exists
              if (savegame === null) {
                return reply({ message: "No such save game file exists." }).code(404);
              }

              // If agent's user_id is the same as current user's then edit save game file
              if (savegame.user_id.toString() === user_id.toString()) { // Your save game
                db.collection('savegames').update({ '_id': id }, { $set: gameState }, function(err, doc){
                  if (err) { return reply(err).code(400); }
                  reply(savegame).code(200);
                });
              } else {
                reply({ message: "This is not the saved game you're looking for."}).code(400);
              }
            });
          } else {
            reply(result).code(400);
          }
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: "setup-api",
  version: "0.0.1"
};
