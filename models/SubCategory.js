const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = require('./Category');
const updateSubcategoriesCount = require('../utils/updateSubcategoriesCount');

const SubCategorySchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: Category
    },
    name: {
        type: String,
        required: true
    }
    // coverPhoto: {
    //     type: String,
    //     required: true
    // },
    // users: {
    //     type: Number,
    //     default: 0
    // }
});

SubCategorySchema.post('save', async function (doc, next) {
    const category = await Category.findOne({ _id: doc.category });

    const subcategoriesCount = category.subcategories;
    const newCount = subcategoriesCount + 1;
    await updateSubcategoriesCount(newCount, Category, category.name);
    next();
});

// SubCategorySchema.post('remove', async function (doc, next) {
//     console.log('doc', doc)
//     const category = await Category.findOne({ _id: doc.category });

//     const subcategoriesCount = category.subcategories;
//     const newCount = subcategoriesCount - 1;
//     await updateSubcategoriesCount(newCount, Category, category.name);
//     next();
// });

module.exports = SubCategory = mongoose.model('subcategory', SubCategorySchema);