// BASE SETUP
// =============================================================================

var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var app        = express();

var configDB   = require('./config/database.js');

mongoose.connect(configDB.url);

app.use(morgan('dev')); // log requests to the console

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Send CORS headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization");
  next();
});

// API ROUTES
// =============================================================================
require('./routes.js')(app);

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 3001;
app.listen(port); 
