const AuthenticationController = require("./controllers/authentication"),
	PollController = require("./controllers/poll"),
	express = require("express"),
	passportService = require("./config/passport"),
	passport = require("passport");

// Middleware to require login/auth
const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

module.exports = function(app) {
	const apiRoutes = express.Router(),
		authRoutes = express.Router();

	// Resond with CORS headers for all pre-flight checks
	apiRoutes.options("/*", function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
		res.header(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization, Content-Length, X-Requested-With"
		);
		res.send(200);
	});

	apiRoutes
		.route("/polls")
		.get(PollController.index)
		.post(PollController.create);

	apiRoutes
		.route("/polls/:id")
		.get(PollController.read)
		.put(PollController.update)
		.delete(PollController.delete);

	//=========================
	// Auth Routes
	//=========================
	apiRoutes.use("/auth", authRoutes);
	authRoutes.post("/register", AuthenticationController.register);
	authRoutes.post("/login", requireLogin, AuthenticationController.login);

	app.use("/api", apiRoutes);
};
