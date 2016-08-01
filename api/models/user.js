var mongodb = require('./db');
var crypto = require('crypto');

function User(user) {
	this.password = user.password;
	this.email = user.email;
	this.username = user.username
}
User.prototype.get = function(options, callback) {
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
				$or:[{email:options.email},{username:options.username}]
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
		email: this.email,
		username: this.username,
		signupTime: new Date().getTime()
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
			console.log('saving')
			console.log(user)
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

User.prototype.login = function(callback) {
	var user = {
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
			collection.updateOne(user, {$set:{
				loginTime: new Date().getTime()
			}}, function(err, data) {
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
