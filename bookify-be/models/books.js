const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number,
    borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    score: {
        type: Number,
        default: -1, 
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Book', bookSchema);
