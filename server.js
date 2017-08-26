// BASE SETUP
// =============================================================================

var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var app        = express();

app.use(morgan('dev')); // log requests to the console

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;

// API ROUTES
// =============================================================================
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ 
    header: 'Horay! Welcome to Preference!',
    subheader: 'This message is coming from the API.'
  });
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port); 