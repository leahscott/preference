const config = require("../config/database"),
	mongoose = require("mongoose"),
	Poll = require("../models/poll"),
	jwt = require("jsonwebtoken"),
	shortId = require("short-mongo-id");

function decryptToken(token) {
	return jwt.verify(token, config.secret);
};

exports.index = function(req, res) {
	currentUserId = parseInt(decryptToken(req.headers.authorization)._id);
	Poll.find({ owner: currentUserId }, function(err, userPolls) {
		if (err) {
	    return next(err);
	  }

	  res.status(200).json({
	    polls: userPolls
	  });
	});
};

exports.read = function(req, res) {
	Poll.findOne({ slug: req.params.id }, function(err, poll) {
		if (err) return handleError(err);
		res.status(201).json(poll);
	});
};

exports.create = function(req, res) {
	const currentUser = decryptToken(req.body.token);

	var poll = new Poll();
	poll.owner = parseInt(currentUser._id);
	poll.slug = shortId(poll._id);
	poll.status = "draft";

	poll.save(function(err, poll) {
		if (err) {
			return next(err);
		}
		res.status(201).json({
			slug: poll.slug
		});
	});
};

exports.update = function(req, res) {
	Poll.findOne({ slug: req.body.slug }, function(err, poll) {
		if (err) return handleError(err);

		poll.title = req.body.title || poll.title;
		poll.status = req.body.status || poll.status;
		poll.expirationDate = req.body.expirationDate || poll.expirationDate;

		poll.save(function(err, poll) {
			if (err) return handleError(err);
			res.send(200);
		})
	});
};

exports.delete = function(req, res) {

};

exports.publish = function(req, res) {
	Poll.findOne({ slug: req.params.id }, function(err, poll) {
		if (err) return handleError(err);

		poll.set({ status: "open" });
		poll.save(function(err) {
			if (err) return handleError(err);
			res.status(201).send(poll);
		});
	});
};

exports.close = function(req, res) {
	Poll.findOne({ slug: req.params.id }, function(err, poll) {
		if (err) return handleError(err);

		poll.set({ status: "closed" });
		poll.save(function(err) {
			if (err) return handleError(err);
			res.status(201).send(poll);
		});
	});
};
