var router = require('express').Router();
var Article = require('../models/article.js');

router.get('/',function(req, res) {
  var article = new Article()
  article.getList_all(function(err, data) {
    if (err) {
      return res.send({
        status: 0,
        msg: err
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
