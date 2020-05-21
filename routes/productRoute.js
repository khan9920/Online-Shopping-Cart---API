const express = require('express');
const router = express.Router();

const Product = require("./../models/Product");

// require controller
const productController = require('../controllers/productController');
const fileUpload = require('../middleware/file-upload');

router.route('/').get(productController.getAllProducts);// route to GET ALL products
router.route('/:id').get(productController.getProduct);// route to GET PRODUCTS
// router.route('/',fileUpload.single('image')).post(productController.addProduct);// route to ADD PRODUCTS
router.post('/', fileUpload.single('productImage'), productController.addProduct);

router.patch('/:id', fileUpload.single('productImage'), productController.updateProduct);

//router.route('/:id').patch(productController.updateProduct);  // rout to EDIT PRODUCTS
router.route('/:id').delete(productController.deleteProduct); // rout to DELETE PRODUCTS

module.exports = router;
