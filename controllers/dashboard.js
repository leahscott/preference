const Poll = require('../models/poll'),
	config = require('../config/database'),
	jwt = require('jsonwebtoken');

function currentUserId(token) {
	return parseInt(jwt.verify(token, config.secret)._id);
}

exports.fetch = function(req, res, next) {
	Poll.find({ owner: currentUserId(req.headers.authorization) }, function(err, userPolls) {
		if (err) {
      return next(err);
    }

    res.status(200).json({
	    polls: userPolls
	  });
	});
};
