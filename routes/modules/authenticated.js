module.exports = function(request, callback) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var session = request.yar.get('hapi_dominion_session'); // CHANGE-ME

  if (!session) {
    return callback({
      "authenticated": false,
      "user": null,
      "message": "Unauthorized"
    });
  }

  db.collection('sessions').findOne({ "session_id": session.session_id }, function(err, result) {
    if (err) { return reply(err).code(400); }

    if (result === null) {
      return callback({
        "authenticated": false,
        "user": null,
        "message": "Unauthorized"
      });
    } else {
      db.collection('users').findOne({ "_id": session.user_id }, function (err, user) {
        if (err) { return reply(err).code(400); }

        return callback({
          "authenticated": true,
          "user": user,
          "message": "Authorized"
        });
      });
    }
  });
};
