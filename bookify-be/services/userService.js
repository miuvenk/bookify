const User = require('../models/users');
const Book = require('../models/books');

exports.createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

exports.getAllUsers = async () => {
    return await User.find();
};

exports.getUserById = async (userId) => {
    return await User.findById(userId);
};

exports.updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

exports.deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

exports.borrowBook = async (bookId, userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (user.books.presentBorrowedBooks.includes(bookId)) {
        throw new Error('Book already borrowed');
    }

    const book = await Book.findById(bookId)
    book.borrowedBy = user
    await book.save();

    user.books.presentBorrowedBooks.push(bookId);
    return await user.save();
};

exports.returnBook = async (bookId, userId, score) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (!user.books.presentBorrowedBooks.includes(bookId)) {
        throw new Error('Book not found in borrowed books');
    }

    user.books.presentBorrowedBooks = user.books.presentBorrowedBooks.filter(id => id.toString() !== bookId.toString());
    
    user.books.pastBorrowedBooks.push({ bookId, userScore: score });

    const book = await Book.findById(bookId)

    book.ratingCount += 1

    if (book.score === -1) {
        book.score = score;
        book.averageRating = score;
    } else {
        book.score += score;
        book.averageRating = book.score / book.ratingCount;
    }

    book.borrowedBy = null
    await book.save();
    
    return await user.save();
};
