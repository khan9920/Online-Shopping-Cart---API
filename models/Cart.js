const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user_ID: String,
    products: [],
    // productID: String,
    // count: {
    //     type: Number,
    //     default: 1
    // }
});

module.exports = mongoose.model('Cart', cartSchema);