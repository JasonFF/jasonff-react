var Session = require('../models/session.js');

function checkLogin(req, res, next) {
  var token = req.body.token || req.query.token;
  if (!req.session.user||req.session._id!=token) {
    var session = new Session()
    session.get({token: token},function(err,data) {
      if (!data) {
        return res.send({status:123,msg:'未登录'})
      }
      var user = JSON.parse(data.session).user
      if (!user||data._id!=token) {
        return res.send({status:123,msg:'未登录'})
      }
      req.session.user = user;
      next()
    })
  }else {
    next()
  }
}
module.exports = checkLogin;
