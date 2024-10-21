const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/create', userController.createUser); 
router.get('/', userController.getAllUsers); 
router.get('/:id', userController.getUserById); 
router.put('/:id', userController.updateUser); 
router.delete('/:id', userController.deleteUser);
router.post('/:userId/borrow/:bookId', userController.borrowBook);
router.post('/:userId/return/:bookId', userController.returnBook);

module.exports = router;
