const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    coverPhoto: {
        type: String,
        required: true
    },
    subcategories: {
        type: Number,
        default: 0
    },
    users: {
        type: Number,
        default: 0
    }
});

module.exports = Category = mongoose.model('category', CategorySchema);