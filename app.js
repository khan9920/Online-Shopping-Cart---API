const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// require routes
const userRoute = require('./routes/user.route');
const categoryRoute = require('./routes/category.route');
const paymentRoute = require('./routes/payment.route');
const productRoute = require('./routes/productRoute');

// defining api URL
const apiURL = '/api/v1/';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//combining api URL with the uploads file
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// combining api URL with the route to work
app.use(apiURL + 'users', userRoute);
app.use(apiURL + 'category', categoryRoute);
app.use(apiURL + 'payment', paymentRoute);
app.use(apiURL + 'products/', productRoute);

module.exports = app;

//https://localhost:3000/api/url/category/:id
