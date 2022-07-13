const express = require('express');
var createError = require('http-errors');
const routerV1 = require('./api/v1');

// Function to create the express app using the application instance passed
const createExpressApp = (app) => {
    const expressApp = express();

    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: false }));

    // Setting V1 router to default request path
    expressApp.use('/', routerV1(app));

    // Catch 404 and forward to error handler
    expressApp.use(function (req, res, next) {
        next(createError(404));
    });

    // Error handler
    expressApp.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500).send();
    });

    return expressApp;
};

module.exports = { createExpressApp };
