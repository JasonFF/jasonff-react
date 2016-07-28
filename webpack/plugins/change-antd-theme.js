var fs = require('fs');
var path = require('path');
function ChangeAntdPlugin(options) {
  this.context = options.context,
  this.todo = true
}

ChangeAntdPlugin.prototype.apply = function(compiler) {
  var that = this;
  compiler.plugin('compile', function(compilation, callback) {
    if (that.todo) {
      var antdLess = path.join(that.context, './app/constants/', 'antd.less');
      var defaultLess = path.join(that.context, './node_modules/antd/lib/style/themes', 'default.less');
      fs.unlinkSync(defaultLess);
      fs.linkSync(antdLess,defaultLess);
      that.todo = false
    }
  })
}

module.exports = ChangeAntdPlugin;
