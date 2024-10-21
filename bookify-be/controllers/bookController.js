const bookService = require('../services/bookService');

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create book' });
    }
};

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get books' });
    }
};

// Get book by id
exports.getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id); 
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get book' }); 
    }
};

