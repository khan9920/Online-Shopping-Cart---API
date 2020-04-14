const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    cardHolderName: {
        type: String,
        required: [true, 'A card must have a card holder name']
    },
    cardNumber: {
        type: Number,
        required: [true, 'A card must have a number']
    },
    expDate: {
        type: String,
        required: [true, 'A card must have a expiry date name']
    },
    cvc: {
        type: Number,
        required: [true, 'A card must have a CVC number']
    },
    userID: {
        type: String,
        required: [true, 'A card must have a CVC number']
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
