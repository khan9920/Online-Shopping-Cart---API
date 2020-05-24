const express = require('express');
const router = express.Router();
const reviewController = require('./../controllers/reviewController');

router.route('/:id').patch(reviewController.addReview);
router.route('/:id').get(reviewController.getReviews);

module.exports = router;