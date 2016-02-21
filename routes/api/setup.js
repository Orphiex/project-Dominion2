var Joi   = require('joi');
var Auth  = require('../modules/Authenticated.js');

exports.register = function(server, options, next){
  server.route([
    { // Get all savegames
      method: 'GET',
      path: '/api/setup',
      handler: function(request, reply){
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('savegames').find().toArray(function (err, results){
          if (err) { return reply(err); }
          reply(results);
        });
      }
    },
    { // Get savegames belonging to a specific user
      method: 'GET',
      path: '/api/{username}/setup',
      handler: function(request, reply){
        var db = request.server.plugins['hapi-mongodb'].db;
        var username = request.params.username;

        // Search the username, and extract the id of the user
        db.collection('users').findOne({ username: username }, function(err, user){
          if (err) { return reply(err).code(400); }

          // Check if user exists
          if (user === null) {
            return reply({ message: 'User not found!' }).code(404);
          }

          // Given the user_id, we will find all the saved games having this user_id
          var user_id = user._id;

          db.collection('savegames').find({ user_id: user_id }).toArray(function(err, results){
            if (err) { return reply(err).code(400); }

            reply(results).code(200);
          });
        });
      }
    },
    { // Create save game file
      method: 'POST',
      path: '/api/setup',
      handler: function(request, reply){
        Auth(request, function(result){
          if (result.authenticated) {
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            var session = request.yar.get('hapi_dominion_session');

            var gameState = {
              user_id: ObjectID(session.user_id),
              // FILL IN HERE
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
      path: '/api/setup/{id}',
      handler: function(request, reply){
        Auth(request, function(result){
          if (result.authenticated){ // Logged in
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            var session = request.yar.get('hapi_dominion_session');

            var id      = ObjectID(request.params.id);
            var user_id = ObjectID(session.user_id);

            // Find the agent
            db.collection('savegames').findOne({ '_id': id }, function(err, savegame){
              if (err) { return reply(err).code(400); }

              // Check if this savegame exists
              if (savegame === null) {
                return reply({ message: 'There is no such saved game.' }).code(404);
              }
              console.log(savegame);
              // If agent's user_id is the same as current user then remove save game file
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
    { // Update Bond
      method: 'PUT',
      path: '/api/setup/{id}',
      handler: function(request, reply){
        Auth(request, function(result){
          if (result.authenticated){
            var db = request.server.plugins['hapi-mongodb'].db;
            var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
            var session = request.yar.get('hapi_dominion_session');
            var id = ObjectID(request.params.id);
            var user_id = ObjectID(session.user_id);

            var gameState = {
              // FILL THIS IN
            };

            db.collection('savegames').findOne({ '_id': id }, function(err, savegame){
              if (err) { return reply(err).code(400); }

              // Check if Bond exists
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
