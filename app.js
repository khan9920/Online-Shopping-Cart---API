const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// require routes
const userRoute = require('./routes/user.route');
const categoryRoute = require('./routes/category.route');
const paymentRoute = require('./routes/payment.route');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const wishlist = require('./routes/wishlistRoute');

// defining api URL
const apiURL = '/api/v1/';

const app = express();
//app.use(cors());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

    next();
});

//combining api URL with the uploads file
app.use('/uploads/images', express.static(path.join('uploads', 'images')));


// combining api URL with the route to work
app.use(apiURL + 'users', userRoute);
app.use(apiURL + 'category', categoryRoute);
app.use(apiURL + 'payment', paymentRoute);
app.use(apiURL + 'products', productRoute);
app.use(apiURL + 'carts', cartRoute);
app.use(apiURL + 'wishlist', wishlist);

module.exports = app;

//https://localhost:3000/api/url/category/:id
