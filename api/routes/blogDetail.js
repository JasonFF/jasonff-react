var router = require('express').Router();
var Article = require('../models/article.js');
var markdown = require('markdown').markdown;

router.get('/',function(req, res) {
  var article = new Article()
  article.get_detail({_id:req.query.blogId||""}, function(err,data) {
    if (err) {
      return res.send({
        status: 0,
        msg: err
      })
    }
    if (!data._id) {
      return res.send({
        status: 0,
        msg: '没有这篇博客'
      })
    }
    if (!req.query.token) {
      data.content = markdown.toHTML(data.content)
    }
    res.send({
      status: 1,
      msg: 'success',
      data: data
    })
  })
})

module.exports = router;
