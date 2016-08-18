var mongodb = require('./db');

function NoteBook() {}

NoteBook.prototype.save = function(options, callback) {
    var notebook = {
        title: options.title,
        userId: options.userId,
        username: options.username,
        createTime: new Date().getTime()
    };
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('notebooks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            };
            collection.insert(notebook, {
                safe: true
            }, function(data) {
                mongodb.close();
                callback(data)
            });
        });
    });
};

NoteBook.prototype.get_detail = function(options, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('notebooks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            };
            var _id = options._id
            collection.findOne({
                "_id": _id
            }).then(function(data) {
                mongodb.close();
                if (err) {
                    return callback(err);
                };
                callback(null, data)
            })

        })
    })
}

NoteBook.prototype.getList_all = function(callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('notebooks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            };
            collection.find().sort({
                createTime: -1
            }).toArray(function(err, data) {
                mongodb.close();
                if (err) {
                    return callback(err);
                };
                callback(null, data)
            })

        })
    })
}

NoteBook.prototype.getList_userId = function(options, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('notebooks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            };
            collection.find(options).sort({
                createTime: -1
            }).toArray(function(err, data) {
                mongodb.close();
                if (err) {
                    return callback(err);
                };
                callback(null, data)
            })
        })
    })
}

NoteBook.prototype.update = function(options, callback) {
    var condition = {
        _id: options._id
    }
    var notebook = {
        title: options.title,
        updateTime: new Date().getTime()
    };
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('notebooks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            };
            collection.updateOne(condition, {
                $set: notebook
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

NoteBook.prototype.update_scan = function(options, callback) {
    var condition = {
        _id: options._id
    }
    var notebook = {
        title: options.title,
        updateTime: new Date().getTime()
    };
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        };
        db.collection('notebooks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            };
            collection.updateOne(condition, {
                $set: notebook
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


module.exports = NoteBook;
