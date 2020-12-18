const express = require('express');
const app = express();

const User = require('./models/user.js').User;

const host = '127.0.0.1'
const port = 3000;

app.set('views', './views'); // Перемена views
app.set("view engine", "ejs"); // Устанавливается движок представлений ejs

app.get('/login', (request, response) => {
    response.render("login", {
        title: "Авторизация"
    })
})

app.get('/register', (request, response) => {
    response.render("register", {
        title: "Регистрация"
    })
})

app.get('/', (request, response) => {
    response.render("main", {
        title: "Главная страница",
        content: "Hello there!"
    });
});

app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
});

let user = new User({
    username: "Tester",
    password: "secter"
});

user.save(function(error, tester) {
    if (error) throw error;

    User.findOne({ username: "Tester" }, function(error, tester) {
        console.log(tester);
    })
});