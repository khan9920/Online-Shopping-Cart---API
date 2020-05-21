const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        //required: [true, 'A product must have a  name']
        default: 0
    },
    productImage: {
        type: String,
        // required: true
        default: 0
    },
    category: {
        type: String,
        //required: [true, 'A product must have a category']
        default: 0
    },
    price: {
        type: Number,
        // required: true
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        //required: true
        default: 0
    },
    description: {
        type: String,
        //required : true
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
