const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Category = require('./Category');
const Subcategory = require('./SubCategory');
const updateUserCount = require('../utils/updateNumberOfUsers');

const PortfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
    },
    profilePicture: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQT7NvIfTyhEXEDqrGjBe6Vaak8FpF2sOThf6pkUGkhdvPeYJ-A&usqp=CAU'
    },
    // category: {
    //     type: String,
    //     required: true
    // },
    // subCategory: {
    //     type: String,
    //     required: true
    // },
    category: {
        type: Schema.Types.ObjectId,
        ref: Category,
        required: true
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: Subcategory,
        required: true
    },
    description: {
        type: String
    },
    location: {
        country: {
            type: String,
            default: 'United States'
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    website: {
        type: String
    },
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    posts: [
        {
            url: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

PortfolioSchema.post('save', async function (doc, next) {
    console.log('document from hook', doc)
    const category = await Category.findOne({ _id: doc.category });
    const subcategory = await Subcategory.findOne({ _id: doc.subCategory });

    const newCategoryUsersCount = category.users + 1;
    const newSubcategoryUsersCount = subcategory.users + 1;

    // Promise.all([updateUserCount(newCategoryUsersCount, Category, doc.category),
    // updateUserCount(newSubcategoryUsersCount, Subcategory, doc.subCategory)]).then(() => {
    //     next();
    // });
    await updateUserCount(newCategoryUsersCount, Category, doc.category);
    next();
});



module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);