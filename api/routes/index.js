var signup = require('./signUp.js');
var login = require('./login.js');
var newblog = require('./newBlog.js');
// 0 err
// 1 success
// 2 repeated
// 3 none

module.exports = function(app) {
  app.all('*', function(req, res, next) {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "Content-Type": "application/json;charset=utf-8"
    })
    next();
  });
  app.use('/signup', signup);
  app.use('/login', login);

  app.use('/newblog',checkLogin);
  app.use('/newblog', newblog);

  function checkLogin(req, res, next) {
    var token = req.body.token || req.query.token;
    if (!req.session.user||req.session.user._id!=token) {
      return res.send({status:0,msg:"未登录"})
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!');
      return res.redirect('back');//返回之前的页面
    }
    next();
  }
}
