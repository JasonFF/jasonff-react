var fs = require('fs');
var path = require('path');
function ChangeAntdPlugin(options) {
  this.context = options.context
}

ChangeAntdPlugin.prototype.apply = function(compiler) {
  var that = this;
  compiler.plugin('optimize', function(compilation, callback) {
    var antdLess = path.join(that.context, './app/constants/', 'antd.less');
    var defaultLess = path.join(that.context, './node_modules/antd/lib/style/themes', 'default.less');
    fs.unlinkSync(defaultLess);
    fs.linkSync(antdLess,defaultLess);
  })
}

module.exports = ChangeAntdPlugin;
