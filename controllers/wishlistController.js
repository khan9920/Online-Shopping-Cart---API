const WishList = require('./../models/WishList');

exports.getWishLists = async (req, res) => {
    const wishlists = await WishList.find();

    res.status(201).json({
        status: 'success',
        data: {
            wishlists
        }
    });
}

exports.createWishListMethod = async (body) => {
    try {
        const newWishLIst = await WishList.create(body);
        console.log(newWishLIst);
        return {
            status: true
        }
    } catch (error) {
        return {
            status: false
        }
    }
}

exports.createWishList = async (req, res) => {
    const newWishLIst = await WishList.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newWishLIst
        }
    });
}

exports.getWishList = async (req, res) => {
    const wishList = await WishList.findOne({ user_ID: req.params.id });

    res.status(200).json({
        status: 'success',
        wishList
    });
};

exports.addToWishList = async (req, res) => {
    try {
        const wishList = await WishList.findOne({ user_ID: req.params.id });
        wishList.products.push(req.body);
        const updatedWishList = await wishList.save();

        res.status(200).json({
            status: 'success',
            data: {
                updatedWishList
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}

exports.updateWishList = async (req, res) => {
    try {
        const productID = req.params.pid;
        const userID = req.params.uid;

        const wishList = await WishList.findOne({ user_ID: userID });
        const products = JSON.parse(JSON.stringify(wishList.products));

        index = products.findIndex(wishList => wishList.product._id === productID);

        if (index > -1) {
            products.splice(index, 1);
        }

        wishList.products = products;
        const newWishList = await wishList.save()

        res.status(200).json({
            status: 'success',
            data: {
                newWishList
            }
        });
    } catch (error) {
        console.log(error);
    }
}
