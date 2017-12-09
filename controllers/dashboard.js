exports.fetch = function(req, res, next) {
  res.status(200).json({
    content: 'Congrats! This is protected content from the API!'
  });
};
