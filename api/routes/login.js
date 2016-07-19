// login
/*
parameters
email
password
status
0 密码错误
1 success
2 none
*/
var router = require('express').Router();
var User = require('../models/user.js');
var crypto = require('crypto');

router.post('/', function(req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('Jason');
  var newUser = new User({
    password: password,
    email: req.body.email
  });
  newUser.get(newUser.email, function(err, user) {
    if (!user) {
      return res.send({status:3,msg:'用户不存在'})
    }
    if (newUser.password.toString() != user.password.buffer.toString()) {
      return res.send({status:0,msg:'密码错误'})
    }
    req.session.user = user;
    res.send({status:1,msg:'success',token:req.session.user._id});
  })
})

module.exports = router;
