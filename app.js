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

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

    next();
});

// combining api URL with the route to work
app.use(apiURL + 'users', userRoute);
app.use(apiURL + 'category', categoryRoute);
app.use(apiURL + 'payment', paymentRoute);
app.use(apiURL + 'products/', productRoute);

module.exports = app;
