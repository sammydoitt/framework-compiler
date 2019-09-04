var express = require('express');
var router = express.Router();
var fs = require('fs')
var uuid = require('uuid');
const uuidv4 = require('uuid/v4');
var sass = require('node-sass')

var vars = fs.readFileSync('./public/nyc-core-framework/scss/_a-global-variables.scss', 'utf-8')

router.post('/', function(req, res, next){
  compileInMemory(req, res, next)
})

function compileInMemory(req, res, next){
  console.log(req.body);
  var [primary, secondary, info, dark, light, compressed] = assignCustomValues(req)

  var sassWithCustomValues = vars
    .replace((/(?<=\$primary: #)....../gm), primary)
    .replace((/(?<=\$secondary: #)....../gm), secondary)
    .replace((/(?<=\$info: #)....../gm), info)
    .replace((/(?<=\$dark: #)....../gm), dark)
    .replace((/(?<=\$light: #)....../gm), light)

  sass.render({
    file: './public/nyc-core-framework/scss/theme.scss',
    importer: function(url, prev, done){
      if (url === "a-global-variables.scss") {
        return {file: './public/nyc-core-framework/scss/_a-global-variables.scss', contents: sassWithCustomValues}
      } else {
        done()
      }
    },
    outputStyle: compressed,
  }, function(err, result) {
    try {
      res.json(result.css.toString())
    } catch (e) {
      console.log("err: " + err)
      res.status('500').json(err.message)
    } finally {
    }
  });
}

const assignCustomValues = (req) => {
  var body = req.body
  var defaultColors = {primary: "181A7B", secondary: "3B6CF6", info: "A513B6", dark: "0A1438", light: "e6ecf7"}

  var primary = body.primary || defaultColors.primary
  var secondary = body.secondary || defaultColors.secondary
  var info = body.info || defaultColors.info
  var dark = body.dark || defaultColors.dark
  var light = body.light || defaultColors.light
  var compressed = body.compressed ? "compressed" : "expanded"

  return [primary, secondary, info, dark, light, compressed]
}

module.exports = router;
