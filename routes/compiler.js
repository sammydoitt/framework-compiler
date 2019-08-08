var express = require('express');
var bodyParser = require("body-parser");

var router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function(req, res, next){
  res.render('form')
})

router.post('/', function(req, res, next){
  console.log(req.body.test);

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
