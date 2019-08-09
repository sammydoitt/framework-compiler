var express = require('express');
var router = express.Router();
var fs = require('fs')
var uuid = require('uuid');
const uuidv4 = require('uuid/v4');
var sass = require('node-sass')

router.get('/', function(req, res, next){
  res.render('form')
})

router.post('/', function(req, res, next){
  compileInMemory(req, res, next)
})

function compileWithDocs(req, res, next){

  var primary = req.body.primary || "181A7B"
  var secondary = req.body.secondary || "3B6CF6"
  var info = req.body.info || "A513B6"
  var dark = req.body.light || "0A1438"
  var light = req.body.dark || "e6ecf7"

  var root = fs.readFileSync('./framework/scss/theme.scss', 'utf-8')
  var vars = fs.readFileSync('./framework/scss/_a-global-variables.scss', 'utf-8')
  var customRootName = uuidv4()
  var customVarsName = uuidv4()
  var customRoot = fs.writeFileSync('./framework/scss/'+ customRootName +'.scss', root.replace("a-global-variables.scss", customVarsName))
  var customVarsData = vars.replace("181A7B", primary).replace("3B6CF6", secondary).replace("A513B6", info).replace("0A1438", dark).replace("e6ecf7", light)
  var customVars = fs.writeFileSync('./framework/scss/'+ customVarsName +'.scss', customVarsData)

  sass.render({
    file: './framework/scss/'+ customRootName +'.scss',
    outputStyle: 'compressed',
  }, function(err, result) {
      try {
        res.render('compiler', {title: "Compiled CSS", css: result.css.toString()})
      } catch (e) {
        console.log("err: " + err)
        res.render('compiler', {title: "Compiled CSS", css:err})
      } finally {
        fs.unlinkSync('./framework/scss/'+ customRootName +'.scss')
        fs.unlinkSync('./framework/scss/'+ customVarsName +'.scss')
      }
  });
}

function compileInMemory(req, res, next){
  var primary = req.body.primary || "181A7B"
  var secondary = req.body.secondary || "3B6CF6"
  var info = req.body.info || "A513B6"
  var dark = req.body.light || "0A1438"
  var light = req.body.dark || "e6ecf7"

  var vars = fs.readFileSync('./framework/scss/_a-global-variables.scss', 'utf-8')
  var customVarsData = vars.replace("181A7B", primary).replace("3B6CF6", secondary).replace("A513B6", info).replace("0A1438", dark).replace("e6ecf7", light)

  sass.render({
    file: './framework/scss/theme.scss',
    importer: function(url, prev, done){
      if (url === "a-global-variables.scss") {
        return {file: './framework/scss/_a-global-variables.scss', contents: customVarsData}
      } else {
        done()
      }
    },
    outputStyle: 'compressed',
  }, function(err, result) {
    try {
      res.render('compiler', {title: "Compiled CSS", css: result.css.toString()})
    } catch (e) {
      console.log("err: " + err)
      res.render('compiler', {title: "Compiled CSS", css:err})
    } finally {
    }
  });
}

module.exports = router;
