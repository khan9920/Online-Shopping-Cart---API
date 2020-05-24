const express = require('express');
const router = express.Router();
const wishlistController = require('./../controllers/wishlistController');

router.route('/').get(wishlistController.getWishLists);

router.route('/:id').get(wishlistController.getWishList);
router.route('/').post(wishlistController.createWishList);
router.route('/:id').patch(wishlistController.addToWishList);
router.route('/:pid/:uid').patch(wishlistController.updateWishList);

module.exports = router;