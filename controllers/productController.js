//import file system
const fs = require('fs');
const Product = require("./../models/Product");


// get all products
exports.getAllProducts = async (req, res) => {
    // find all products form the database and assign it to a variable

     const products = await Product.find();
    //
    // // send response along with the users array
    res.status(200).json({
      //  messagae: 'Success',
        products
    });
    // res.send([
    //    products
    // ]);
}

// get single product by id
exports.getProduct = async (req, res) => {
    // find a particular user by passing the user ID through URL parameter and assign the user to a variable
    const product = await Product.findById(req.params.id);

    // send response along with the user
    res.status(201).json({
        messagae: 'Success',
        product
    });
}

// add a product
exports.addProduct = async (req, res) => {

    req.body.productImage = req.file.path;
    const newProduct = await Product.create(req.body);

    // send response along with the added product
    res.status(201).json({
        message: 'Success',
        newProduct
    });
}


// update a product
exports.updateProduct = async (req, res) => {

	if (req.file)
	{
        req.body.productImage = req.file.path;
    }
	
    // update user and save to database
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {

        new: true,
        runValidators: true,
    });

    // send response along with the added user
    res.status(200).json({
        message: 'Success',
        updatedProduct
    });
}

// delete a product
exports.deleteProduct = async (req, res) => {
    // find product using the user ID passed through URL parameter and delete product
    const product =  await Product.findByIdAndDelete(req.params.id);

    //delete image from uploads folder
    const imagePath = product.productImage;
    fs.unlink(imagePath, err => {
        console.log(err);
    });

    // send response
    res.status(200).json({
        messagae: 'Success',
        data: null
    });
}
