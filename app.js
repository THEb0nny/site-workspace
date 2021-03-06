const express = require('express');
const http = require('http');
const connect = require('connect');
const path = require('path');
const config = require('config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const errorHandler = require('errorhandler');
const HttpError = require('./error').HttpError;
const app = express();

const host = '127.0.0.1'
const port = 3000;

app.set('views', './views'); // Переменая views
app.set("view engine", "ejs"); // Устанавливается движок представлений ejs

/*if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}*/

app.use(bodyParser.json());
app.use(cookieParser());
app.use(errorHandler());
app.use(require('./middleware/sendHttpError'));

require('./routes')(app);

app.use(function(err, req, res, next) {
    if (typeof err == 'number') {
        err = new HttpError(err);
    }
    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

app.listen(port, host, () => {
    console.log(`Server listens http://${host}:${port}`);
});