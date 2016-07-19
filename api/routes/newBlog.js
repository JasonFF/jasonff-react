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

router.get('/', function(req, res) {
  res.send({session:"newBlog"})
})

module.exports = router;
