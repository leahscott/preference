var express = require('express');

module.exports = function(app) {
  var router = express.Router();
  
  router.get('/', function(req, res) {
    res.json({ 
      header: 'Horay! Welcome to Preference!',
      subheader: 'This message is coming from the API.'
    });
  });

  app.use('/api', router);
}