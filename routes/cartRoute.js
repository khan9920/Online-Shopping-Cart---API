const express = require('express');
const router = express.Router();
const cartController = require('./../controllers/cartController');

router.route('/:id').get(cartController.getCart);
router.route('/').post(cartController.createCart);
router.route('/:id').patch(cartController.addToCart);
router.route('/:pid/:uid').patch(cartController.updateCart);

//router.route('/').get(cartController.getCarts);
module.exports = router;