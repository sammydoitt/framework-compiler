var express = require('express');
var router = express.Router();
var fs = require('fs')
var uuid = require('uuid');
const uuidv4 = require('uuid/v4');
var sass = require('node-sass')

var vars = fs.readFileSync('./public/nyc-core-framework/scss/_a-global-variables.scss', 'utf-8')

router.get('/', function(req, res, next){
  res.render('form')
})

router.post('/', function(req, res, next){
  compileInMemory(req, res, next)
})
function compileInMemory(req, res, next){
  console.log(req.body);
  var primary = req.body.primary || "#181A7B"
  var secondary = req.body.secondary || "#3B6CF6"
  var info = req.body.info || "#A513B6"
  var dark = req.body.dark || "#0A1438"
  var light = req.body.light || "#e6ecf7"

  var customVarsData = vars.replace((/(?<=\$primary: )......./gm), primary).replace((/(?<=\$secondary: )......./gm), secondary).replace((/(?<=\$info: )......./gm), info).replace((/(?<=\$dark: )......./gm), dark).replace((/(?<=\$light: )......./gm), light)

  sass.render({
    file: './public/nyc-core-framework/scss/theme.scss',
    importer: function(url, prev, done){
      if (url === "a-global-variables.scss") {
        return {file: './public/nyc-core-framework/scss/_a-global-variables.scss', contents: customVarsData}
      } else {
        done()
      }
    },
    outputStyle: 'compressed',
  }, function(err, result) {
    try {
      res.json(result.css.toString())
    } catch (e) {
      console.log("err: " + err)
      res.render('compiler', {title: "Compiled CSS", css:err})
    } finally {
    }
  });
}

module.exports = router;
