const express = require('express');
const bodyParser = require('body-parser');

// require routes
const userRoute = require('./routes/userRoute');

// defining api URL
const apiURL = '/api/v1/';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// combining api URL with the route to work
app.use(apiURL + 'users/', userRoute);

module.exports = app;