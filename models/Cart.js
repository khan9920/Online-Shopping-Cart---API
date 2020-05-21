const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user_ID: String,
    products: [],
});

module.exports = mongoose.model('Cart', cartSchema);