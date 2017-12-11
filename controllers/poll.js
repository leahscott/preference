const config = require("../config/database"),
	mongoose = require("mongoose"),
	Poll = require("../models/poll"),
	jwt = require("jsonwebtoken"),
	Hashids = require("hashids");

function decryptToken(token) {
	return jwt.verify(token, config.secret);
}

exports.create = function(req, res, next) {
	const currentUser = decryptToken(req.headers.authorization);
	const hashids = new Hashids('Poll', 4);

	var poll = new Poll();
	poll.owner = parseInt(currentUser._id);
	poll.slug = hashids.encode(parseInt(poll._id));

	poll.save(function(err, poll) {
		if (err) {
			return next(err);
		}

		res.status(201).json({
			slug: poll.slug
		});
	});
};
