var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function Article() {}

Article.prototype.save = function(options,callback) {
	var article = {
		title: options.title,
		content: options.content,
		userId: options.userId,
		username: options.username,
    createTime: new Date().getTime(),
		scan: 0
	};
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('articles', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.insert(article, {
				safe: true
			}, function(data) {
				mongodb.close();
				callback(data)
			});
		});
	});
};

Article.prototype.get_detail = function(options,callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('articles', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			var _id = new ObjectID(options._id)
      collection.findOne({"_id":_id}).then(function(data) {
        mongodb.close();
				if (err) {
          return callback(err);
				};
				callback(null,data)
      })

		})
	})
}

Article.prototype.getList_all = function(callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('articles', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
      collection.find().sort({createTime: -1}).toArray(function(err,data) {
        mongodb.close();
				if (err) {
          return callback(err);
				};
				callback(null,data)
      })

		})
	})
}

Article.prototype.getList_userId = function(options, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('articles', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.find(options).sort({createTime: -1}).toArray(function(err,data) {
        mongodb.close();
				if (err) {
          return callback(err);
				};
				callback(null,data)
      })
		})
	})
}

Article.prototype.update = function(options, callback) {
  var condition = {
    _id: new ObjectID(options._id)
  }
	var article = {
    title: options.title,
		content: options.content,
    updateTime: new Date().getTime()
	};
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('articles', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.updateOne(condition, {$set:article}, function(err, data) {
				mongodb.close();
				if (err) {
					return callback(err);
				};
				callback(null, data)
			});
		});
	});
};

Article.prototype.update_scan = function(options, callback) {
  var condition = {
    _id: new ObjectID(options.articleId)
  }
	var article = {
    title: options.title,
		content: options.content,
    updateTime: new Date().getTime()
	};
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('articles', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.updateOne(condition, {$set:article}, function(err, data) {
				mongodb.close();
				if (err) {
					return callback(err);
				};
				callback(null, data)
			});
		});
	});
};


module.exports = Article;
