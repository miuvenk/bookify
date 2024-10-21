const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number,
    books: {
        presentBorrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }], 
        pastBorrowedBooks: [{
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, 
            userScore: { type: Number, default: null } 
        }]
    },
});

module.exports = mongoose.model('User', userSchema);
