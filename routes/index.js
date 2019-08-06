var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('aaa')
  res.render('index', { title: 'Expresss' });
});

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

var b =  function (req, res, next) {

  // sass.listFiles(function callback(list) {
  //   // (array) list contains the paths of all registered files
  //   console.log(list)
  // });
  // sass.readFile('theme.scss', function callback(content) {
  //   console.log('scss: ' + content)
  //   // (string) content is the file's content,
  //   //   `undefined` when the read failed
  // });
  // sass.compileFile('theme.scss', function callback(result) {
  //   console.log('css: ' + result)
  // })

  next()
}

router.get('/b', [b], function(req, res, next){
  var sass = require('sass.js');
  var fs = require('fs');
  fs.readFile('sass/theme.scss', 'utf8', function(err, data) {
      if (err) throw err;
      sass.writeFile({'theme.scss': data})
      fs.readFile('sass/_test-import.scss', 'utf8', function(err, data) {
          if (err) throw err;
          sass.writeFile({'_test-import.scss': data})
          sass.compileFile('@import "theme"; @import "test-imports"', function callback(result) {
            console.log(result);
            res.send(result['text'])
          })
    })
})
})

var c =  function (req, res, next) {

  next()
}

router.get('/c', [c], function(req, res, next){
  var sass = require('sass.js');
  var fs = require('fs');
  var scss = ''
  fs.readFile(['sass/theme.scss', 'sass/_test-import.scss'], 'utf8', function(err, data) {
      if (err) throw err;
      console.log(data)
      sass.writeFile({'theme.scss': data}, (success)=>{
        if (success) {
          sass.compileFile('theme.scss', function callback(result) {
            res.send(result['text'])
          })
        }
      })
  });
})

module.exports = router;
