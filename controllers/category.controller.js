const Category = require('./../models/category.model');

// add category
exports.addCategory = async (req, res) => {
    const category = new Category(req.body);

    await category.save();

    res.status(200).json({
        message: 'Success',
        category
    });
}
