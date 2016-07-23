
var router = require('express').Router();
var Article = require('../models/article.js');
var multer = require('multer');
var upload = multer();
var checkLogin = require('./checkLogin.js')

router.post('/',upload.array(),checkLogin ,function(req, res) {
  var article = new Article();
  article.update({
    title: req.body.title,
    content: req.body.content,
    articleId: req.body.blogid
  },function(err, data) {
    if (err) {
      return res.send({
        status: 0,
        msg: err
      })
    }
    res.send({
      status: 1,
      msg: 'success'
    })
  })
})

module.exports = router;
