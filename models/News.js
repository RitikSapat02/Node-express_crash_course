const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    headline: {
        type: String,
        // required:true
    },
    description: {
        type: String,
        // required:true
    },
    department: {
        type: String,
        // required:true
    },
    imageUrl: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = News = mongoose.model('news', NewsSchema);