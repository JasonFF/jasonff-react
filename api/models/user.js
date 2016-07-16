var mongodb = require('./db');
var crypto = require('crypto');

function User(user) {
	this.password = user.password;
	this.email = user.email;
}
User.prototype.get = function(email, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.findOne({
				email: email
			}, function(err, data) {
				if (err) {
					mongodb.close();
				};
				callback(null,data)
			})
		})
	})
}

User.prototype.save = function(callback) {
	var user = {
		password: this.password,
		email: this.email
	};
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.insert(user, {
				safe: true
			}, function(err, data) {
				mongodb.close();
				if (err) {
					return callback(err);
				};
				callback(null, data)
			});
		});
	});
};

module.exports = User;
