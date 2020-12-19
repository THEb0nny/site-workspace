let mongoose = require('./libs/mongoose.js');
let async = require('async');

async.series([
    open,
    dropDataBase,
    requireModels,
    createUsers
], function(err, results) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDataBase(callback) {
    let db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/user.js');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {
    let users = [
        { username: 'Дмитрий', password: 'super' }
    ];

    async.each(users, function(userData, callback) {
        let user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}