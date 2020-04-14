const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
   name: {
       type: String,
       required: [true, 'A category must have a name']
   },
    description: {
       type: String,
        required: [true, 'A category must have a description']
    }
});

module.exports = mongoose.model('Category', categorySchema);
