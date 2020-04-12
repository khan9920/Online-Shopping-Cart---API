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

// get all category
exports.getAllCategory = async (req, res ) => {
    const categories = await Category.find();

    res.status(200).json({
        message: 'Success',
        categories
    });
}

// get single category
exports.getCategory = async  (req, res) => {
    const categoryID = req.params.id;

    const category = await Category.findById(categoryID);

    res.status(200).json({
        message: 'Success',
        category
    });
}

// delete category
exports.deleteCategory = async (req, res) => {
    const categoryID = req.params.id;

    await Category.findByIdAndDelete(categoryID);

    res.status(201).json({
        message: 'Category deleted successfully'
    });
}

// update category
exports.updateCategory = async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        message: 'Success',
        updatedCategory
    });
}
