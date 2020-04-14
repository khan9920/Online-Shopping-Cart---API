const express = require('express');
const router = express.Router();
const paymentController = require('./../controllers/paymentController');

router.route('/').post(paymentController.addPayment);
router.route('/').get(paymentController.getAllPayments);
router.route('/:id').get(paymentController.getPayment);
router.route('/:id').delete(paymentController.deletePayment);

module.exports = router;