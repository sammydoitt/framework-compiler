var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hi there, the app is working! This is an API for the NYC Core Framework Compiler. You can use this api by submitting a request with json object for {primary: (color hex code), secondary: (color hex code), info: (color hex code), dark:  (color hex code), light: (color hex code), compressed: (true or false)} to /compiler.');
});

module.exports = router;
