var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('form')
})

var isOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#ac3')

router.post('/', [check(*).], function(req, res, next){
  console.log(req.body);
  var primary = req.body.primary
  var secondary = req.body.secondary
  var info = req.body.info
  var dark = req.body.light
  var light = req.body.dark

  var fs = require('fs')
  var uuid = require('uuid');
  const uuidv4 = require('uuid/v4');

  var root = fs.readFileSync('./framework/scss/theme.scss', 'utf-8')
  var vars = fs.readFileSync('./framework/scss/_a-global-variables.scss', 'utf-8')
  var customRootName = uuidv4()
  var customVarsName = uuidv4()
  var customRoot = fs.writeFileSync('./framework/scss/'+ customRootName +'.scss', root.replace("a-global-variables.scss", customVarsName))
  var customVarsData = vars.replace("181A7B", primary).replace("3B6CF6", secondary).replace("A513B6", info).replace("0A1438", dark).replace("e6ecf7", light)
  var customVars = fs.writeFileSync('./framework/scss/'+ customVarsName +'.scss', customVarsData)
  var sass = require('node-sass')
  sass.render({
    file: './framework/scss/'+ customRootName +'.scss',
    outputStyle: 'compressed',
  }, function(err, result) {
    console.log("err: " + err)
    res.render('compiler', {title: "Compiled CSS", css: result.css.toString()})
    fs.unlinkSync('./framework/scss/'+ customRootName +'.scss')
    fs.unlinkSync('./framework/scss/'+ customVarsName +'.scss')
  });
})

module.exports = router;
