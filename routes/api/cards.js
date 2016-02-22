var Joi   = require('joi');
var Auth  = require('./auth');

exports.register = function(server, options, next){
  server.route([
    { //
      method: 'GET',
      path: '/api/cards',
      handler: function (request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('cards').find().toArray(function(err, result){
          if (err) {return reply(err).code(400); }

          reply(result);
        });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: "cards-api",
  version: "0.0.1"
};
