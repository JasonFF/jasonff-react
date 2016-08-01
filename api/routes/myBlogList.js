var router = require('express').Router();
var Article = require('../models/article.js');
var multer = require('multer');
var upload = multer();
var checkLogin = require('./checkLogin.js')

router.get('/',checkLogin ,function(req, res) {
  var article = new Article();
  article.getList_userId({userId: req.session.user._id},function(err,data) {
    if (err) {
      return res.send({
        status: 0,
        msg: err
      })
    }
    res.send({
      status:1,
      msg:'success',
      data: data
    })
  })
})

module.exports = router;
