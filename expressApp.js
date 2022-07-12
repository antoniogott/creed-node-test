const express = require('express');
var createError = require('http-errors');

const routerV1 = require('./api/v1');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routerV1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500).send();
});

module.exports = app;
