const Cart = require('./../models/Cart');

exports.getCarts = async (req, res) => {
    const carts = await Cart.find();

    res.status(201).json({
        status: 'success',
        data: {
            carts
        }
    });
}

exports.createCartMethod = async (body) => {
    const newCart = await Cart.create(body);
    return {
        status: true
    };
}

exports.createCart = async (req, res) => {
    const newCart = await Cart.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newCart
        }
    });
}

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ user_ID: req.params.id });

    res.status(200).json({
        status: 'success',
        cart
    });
};

exports.addToCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_ID: req.params.id });
        cart.products.push(req.body);
        const updatedCart = await cart.save();

        res.status(200).json({
            status: 'success',
            data: {
                updatedCart
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}

exports.updateCart = async (req, res) => {
    try {
        const productID = req.params.pid;
        const userID = req.params.uid;

        const cart = await Cart.findOne({ user_ID: userID });
        const products = JSON.parse(JSON.stringify(cart.products));

        index = products.findIndex(product => product.product._id === productID);

        if (index > -1) {
            products.splice(index, 1);
        }

        cart.products = products;
        const newCart = await cart.save()

        res.status(200).json({
            status: 'success',
            data: {
                newCart
            }
        });
    } catch (error) {
        console.log(error);
    }
}
