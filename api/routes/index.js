var signup = require('./signup.js');
var login = require('./login.js');
var newblog = require('./newBlog.js');
var newBlog = require('./newBlog.js');
var blogList = require('./blogList.js')
var blogDetail = require('./blogDetail.js');
var updateBlog = require('./updateBlog.js');
var myBlogList = require('./myBlogList.js');

module.exports = function(app) {
  app.all('*', function(req, res, next) {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "X-Powered-By": '3.2.1',
      "Content-Type": "application/json;charset=utf-8"
    })
    next();
  });
  app.use('/signup', signup);
  app.use('/login', login);
  app.use('/newblog', newBlog);
  app.use('/bloglist', blogList);
  app.use('/blogdetail', blogDetail);
  app.use('/updateblog', updateBlog);
  app.use('/updateblogscan', updateBlog);
  app.use('/mybloglist', myBlogList);
}
