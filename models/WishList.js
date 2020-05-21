const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    user_ID: String,
    products: []
})


module.exports = mongoose.model('WishList', wishlistSchema);