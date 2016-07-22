var mongodb = require('./db');
var crypto = require('crypto');

function Session(session) {
}
Session.prototype.get = function(options, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		};
		db.collection('sessions', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			};
			collection.findOne({
				_id: options.token
			}, function(err, data) {
				if (err) {
					mongodb.close();
				};
				callback(null,data)
			})
		})
	})
}
module.exports = Session;
