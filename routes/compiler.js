var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  var sass = require('node-sass')
  sass.render({
    file: './framework/scss/theme.scss',
    outputStyle: 'compressed'
  }, function(err, result) {
    console.log(err)
    res.render('compiler', {title: "Compiled CSS", css: result.css.toString()})
  });
})

module.exports = router;
