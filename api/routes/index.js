var signup = require('./signUp.js');
var login = require('./login.js');

// 0 err
// 1 success
// 2 repeated
// 3 none

module.exports = function(app) {
  app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1')
      res.header("Content-Type", "application/json;charset=utf-8");
      next();
  });
    app.use('/signup', signup);
    app.use('/login', login)
}
