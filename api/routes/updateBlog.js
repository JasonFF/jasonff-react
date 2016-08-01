
var router = require('express').Router();
var Article = require('../models/article.js');
var multer = require('multer');
var upload = multer();
var checkLogin = require('./checkLogin.js')

router.post('/',upload.array(),checkLogin ,function(req, res) {
  var article = new Article();
  article.get_detail({_id: req.body.blogId},function(err,data) {
    if (err) {
      return res.send({
        status: 0,
        msg: err
      })
    }
    if (data.userId != req.session.user._id) {
      return res.send({
        status:0,
        msg:'用户不对！'
      })
    }
    article.update({
      title: req.body.title,
      content: req.body.content,
      _id: req.body.blogId
    },function(err, data) {
      if (err) {
        return res.send({
          status: 0,
          msg: err
        })
      }
      res.send({
        status: 1,
        msg: 'success',
        data: {
          title: req.body.title,
          content: req.body.content,
          blogId: req.body.bolgId
        }
      })
    })
  })
})

module.exports = router;
