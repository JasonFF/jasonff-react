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

router.post('/',function(req, res){
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('Jason');
  if (req.body.password != req.body.passwordRe) {
    res.send({
      status: 3,
      msg: 'password error'
    })
  }else {
    var newUser = new User({
      password: password,
      email: req.body.email
    });
    newUser.get(newUser.email, function(err, user){
      if (user) {
        res.send({status:2,msg:'repeated'})
      }else {
        newUser.save(function(err, result){
          if (err) {
            res.send({status:0,msg:err})
          }else {
            res.send({status:1,msg:'success'})
          }
        })
      }
    })
  }
})

module.exports = router;
