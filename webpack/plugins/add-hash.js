var fs = require('fs');
function AddHashPlugin(options) {
  this.from = options.from;
  this.to  = options.to;
}

AddHashPlugin.prototype.apply = function(compiler) {
  var that = this;
  compiler.plugin('done', function(compilation, callback) {
    var stats = compilation.toJson();
    var bundlejs,maincss;
    var mains = stats.assetsByChunkName.main;
    for (var i = 0; i < mains.length; i++) {
      if (/^(bundle).+(js)$/.test(mains[i])) {
        bundlejs = mains[i]
      }
      if (/^(main).+(css)$/.test(mains[i])) {
        maincss = mains[i]
      }
    }
    if (!stats.errors.length) {
        var html = fs.readFileSync(that.from, "utf8");
        var htmlOutput = html.replace('bundle.js', bundlejs).replace('main.css', maincss);
        fs.writeFileSync(that.to, htmlOutput);
    }
  })
}

module.exports = AddHashPlugin;
