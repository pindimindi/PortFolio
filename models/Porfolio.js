const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const PortfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    profilePicture: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQT7NvIfTyhEXEDqrGjBe6Vaak8FpF2sOThf6pkUGkhdvPeYJ-A&usqp=CAU'
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);