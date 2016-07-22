/*
parameters
email
password
passwordRe
0 错误
1 success
2 repeated
3 password error
*/

var router = require('express').Router();
var User = require('../models/user.js');
var crypto = require('crypto');
var multer = require('multer');
var upload = multer();

router.post('/',upload.array(), function(req, res){
  if (req.body.password != req.body.passwordRe) {
    return res.send({
      status: 3,
      msg: '重复密码错误'
    })
  }
  if (!req.body.email||!req.body.username||!req.body.password) {
    return res.send({
      status: 4,
      msg: '请完善信息'
    })
  }
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('Jason');
  var newUser = new User({
    username: req.body.username,
    password: password,
    email: req.body.email
  });
  newUser.get({email: newUser.email, username: newUser.username}, function(err, user){
    if (user) {
      return res.send({status:2,msg:'repeated'})
    }
    newUser.save(function(err, result){
      if (err) {
        return res.send({status:0,msg:err})
      }
      return res.send({status:1,msg:'success'});
    })
  })
})

module.exports = router;
