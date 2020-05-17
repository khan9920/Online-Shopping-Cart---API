const express = require('express');
const router = express.Router();

const Product = require("./../models/Product");
//const multer = require("multer");
//const upload = multer({dest: 'upload/'});



// require controller
const productController = require('../controllers/productController');
const fileUpload = require('../middleware/file-upload');

router.route('/').get(productController.getAllProducts);// route to GET ALL products
router.route('/:id').get(productController.getProduct);// route to GET PRODUCTS
// router.route('/',fileUpload.single('image')).post(productController.addProduct);// route to ADD PRODUCTS
 router.post('/',fileUpload.single('productImage'),productController.addProduct);
/*
router.post('/',upload.single('productImage'), (req, res, next) => {
   console.log(req.file);
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price : req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        createdAt: req.body.createdAt,
    })
    product.save().then(result => {
        res.status(200).json({
            messagae: 'Success',
            product: {
                name : result.name,
                category : result.category,
                price : result.price,
                quantity : result.quantity,
                description : result.description,
                createdAt : result.createdAt

            }
        });
    })


});

*/
router.patch('/:id',fileUpload.single('productImage'),productController.updateProduct);

//router.route('/:id').patch(productController.updateProduct);  // rout to EDIT PRODUCTS
router.route('/:id').delete(productController.deleteProduct); // rout to DELETE PRODUCTS

module.exports = router;
