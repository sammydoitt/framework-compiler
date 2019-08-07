var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('aaa')
  res.render('index', { title: 'Expresss' });
});

/* Test SCSS string with print to console */
var a =  function (req, res, next) {
  var Sass = require('sass.js');
  var scss = '$someVar: 123px; .some-selector { width: $someVar; }';
  Sass.compile(scss, function(result) {
    console.log(result);
  });
  next()
}
router.get('/a', [a], function(req, res, next){
  res.send('Hello from A')
})

/* compile 2 files with @import. not async. weird results */
router.get('/b', function(req, res, next){
  var sass = require('sass.js');
  var fs = require('fs');
  fs.readFile('scss/theme.scss', 'utf8', function(err, data) {
      if (err) throw err;
      sass.writeFile({'theme.scss': data})
    })
  fs.readFile('scss/_test-import.scss', 'utf8', function(err, data) {
    if (err) throw err;
    sass.writeFile({'_test-import.scss': data})
  })
  sass.compileFile('theme.scss', function callback(result) {
    console.log(result);
    res.send(result['text'])
  })
})

router.get('/c', function(req, res, next){
  var sass = require('node-sass')
  sass.render({
    file: './scss/theme.scss',
    outputStyle: 'nested'
  }, function(err, result) {
    console.log(err)
    console.log(result.css)
    res.send(result)
  });
})

router.get('/d', function(req, res, next){
  var sass = require('node-sass')
  var result = sass.renderSync({
    file: './scss/theme.scss',
    outputStyle: 'nested',
  })
    console.log(result.css.toString());
    res.send(result)
  });



module.exports = router;
