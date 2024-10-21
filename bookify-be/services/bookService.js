const Book = require('../models/books');

// Create a new book
exports.createBook = async (data) => {
    const book = new Book(data);
    return await book.save();
};

// Get all books
exports.getBooks = async () => {
    return await Book.find();
};

// Get Book By Id
exports.getBookById = async (bookId) => {
    return await Book.findById(bookId);
};
