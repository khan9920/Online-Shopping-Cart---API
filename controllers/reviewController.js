const Product = require('./../models/Product');

exports.addReview = async (req, res) => {
    const productID = req.params.id;
    const userID = req.body.userID;
    const review = {
        userID,
        name: req.body.name,
        rating: req.body.rating,
        comment: req.body.comment
    }

    const product = await Product.findOne({ _id: productID });
    product.reviews.push(review);

    const reviewedProduct = await product.save();

    res.status(200).json({
        status: 'success',
        data: reviewedProduct
    })
}

exports.getReviews = async (req, res) => {
    const product = await Product.find({ _id: req.params.id });
    const reviews = JSON.parse(JSON.stringify(product[0].reviews))

    let totalRating = 0;
    let count = 0;
    let avg = 0;

    for (i = 0; i < reviews.length; i++) {
        totalRating += reviews[i].rating;
        count++;
    }

    avg = Math.round(totalRating / count).toFixed(2);

    if (count === 0) {
        avg = 0.0;
    }

    res.status(200).json({
        status: 'success',
        reviews,
        avg
    });
}