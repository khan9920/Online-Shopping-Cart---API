const express = require('express');
const router = express.Router();
const categoryController = require('./../controllers/category.controller');

router.route('/').post(categoryController.addCategory);
router.route('/').get(categoryController.getAllCategory);
router.route('/:id').get(categoryController.getCategory);
router.route('/:id').delete(categoryController.deleteCategory);
router.route('/:id').patch(categoryController.updateCategory);

module.exports = router;
