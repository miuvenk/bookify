const userService = require('../services/userService');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body); 
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' }); 
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users' });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id); 
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user' }); 
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body); 
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user' }); 
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id); 
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' }); 
    }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
    try {
        const { bookId, userId } = req.params; 
        const updatedUser = await userService.borrowBook(bookId, userId);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        const { bookId, userId } = req.params; 
        const { score } = req.body; 
        const updatedUser = await userService.returnBook(bookId, userId, score);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};
