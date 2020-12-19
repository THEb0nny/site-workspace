const User = require('../models/user.js').User;
const HttpError = require('../error').HttpError;
const ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {

    app.get('/login', (request, response) => {
        response.render("login", {
            title: "Авторизация"
        })
    })

    app.get('/users', function(request, response, next) {
        User.find({}, function(err, users) {
            if (err) return next(err);
            response.json(users);
        })
    });

    app.get('/user/:id', function(req, res, next) {
        try {
            let id = new ObjectID(req.param.id);
        } catch (e) {
            next(404);
            return;
        }

        User.findById(req.params.id, function(err, user) {
            if (err) return next(err);
            if (!user) { // 404
                next(new HttpError(404, "User is not found"));
            }
            res.json(user);
        });
    });

    app.get('/', (request, response) => {
        response.render("main", {
            title: "Главная страница",
            content: "Hello there!"
        });
    });

};