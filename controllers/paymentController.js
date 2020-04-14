const Payment = require('./../models/payment.model');

// add payment
exports.addPayment = async (req, res) => {
    const payment = new Payment(req.body);

    await payment.save();

    res.status(200).json({
        message: 'Success',
        payment
    });
}

// get all payments
exports.getAllPayments = async (req, res) => {
    const payments = await Payment.find();

    res.status(200).json({
        message: 'Success',
        payments
    });
}

// get single payment
exports.getPayment = async (req, res) => {
    const payment = await Payment.findById(req.params.id);

    res.status(200).json({
        message: 'Success',
        payment
    });
}

// delete payment
exports.deletePayment = async (req, res) => {
    await Payment.findByIdAndDelete(req.params.id);

    res.status(201).json({
        message: 'Payment deleted successfully',
        data: null
    });
}
