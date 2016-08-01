var router = require('express').Router();
var User = require('../models/user.js');
var crypto = require('crypto');
var multer = require('multer');
var upload = multer();

router.post('/',upload.array() ,function(req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('Jason');
  var newUser = new User({
    password: password,
    email: req.body.email,
    username: req.body.username
  });
  newUser.get({email: newUser.email,username: newUser.username}, function(err, user) {
    if (!user) {
      return res.send({status:3,msg:'用户不存在'})
    }
    console.log(newUser.password,user.password.buffer)
    if (newUser.password.toString() != user.password.buffer.toString()) {
      return res.send({status:0,msg:'密码错误',user:user})
    }
    req.session.user = user;
    newUser.email = user.email;
    newUser.login(function(){
      res.send({
        status: 1,
        msg: 'success',
        user: req.session.user,
        token: req.sessionID
      });
    });
  })
})

module.exports = router;
