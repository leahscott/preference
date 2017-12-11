const AuthenticationController = require('./controllers/authentication'),
	DashboardController = require('./controllers/dashboard'),
	PollController = require('./controllers/poll'),
	express = require('express'),
	passportService = require('./config/passport'),
	passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
	const apiRoutes = express.Router(),
		authRoutes = express.Router();

	apiRoutes.get('/polls/new', PollController.create);

	apiRoutes.get('/dashboard', DashboardController.fetch);

	//=========================
	// Auth Routes
	//=========================
	apiRoutes.use('/auth', authRoutes);
	authRoutes.post('/register', AuthenticationController.register);
	authRoutes.post('/login', requireLogin, AuthenticationController.login);

	app.use('/api', apiRoutes);
};
