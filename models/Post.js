const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Portfolio = require('./Porfolio');

const PostSchema = new Schema({
    portfolio: {
        type: Schema.Types.ObjectId,
        ref: Portfolio,
    },
    media: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Post = mongoose.model('post', PostSchema);