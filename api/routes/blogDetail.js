var router = require('express').Router();
var Article = require('../models/article.js');

router.get('/',function(req, res) {
  var article = new Article()
  console.log(req.query.blogId)
  article.get_detail({_id:req.query.blogId}, function(data) {
    console.log('callback')
    if (!data._id) {
      return res.send({
        status: 0,
        msg: '没有这篇博客'
      })
    }
    res.send({
      status: 1,
      msg: 'success',
      data: data
    })
  })
})

module.exports = router;
