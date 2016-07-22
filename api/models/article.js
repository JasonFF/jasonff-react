var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function Article() {}

Article.prototype.save = function(options,callback) {
	var article = {
		title: options.title,
		content: options.content,
		userId: options.userId,
    createTime: new Date().getTime()
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
			console.log(article)
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
	console.log(options)
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
      collection.findOne({"_id":_id}).then(function(err, data) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
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
      collection.find().toArray(function(err, data) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null,data)
      })

		})
	})
}

Article.prototype.getList_userId = function(userId, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('articles', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.find({
				userId: userId
			}, function(err, data) {
        mongodb.close();
				if (err) {
          return callback(err);
				};
				callback(null,data)
			})
		})
	})
}

Article.prototype.update = function(articleId, callback) {
  var condition = {
    _id: articleId
  }
	var article = {
    title: this.title,
		content: this.content,
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
