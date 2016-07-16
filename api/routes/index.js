var signup = require('./signUp.js');
var login = require('./login.js');

// 0 err
// 1 success
// 2 repeated
// 3 none

module.exports = function(app) {
    app.use('/signup', signup);
    app.use('/login', login)
}
