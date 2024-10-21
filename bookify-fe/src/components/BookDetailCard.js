import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersService from '../services/UsersService';
import { setUsers } from '../redux/usersSlice';

const BookDetailCard = ({ book }) => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');

    useEffect(() => {
        if (!users.length) {
            getAllUsers()
        }

    }, [dispatch, users]);

    const getAllUsers = async () => {
        try {
            usersService.getAllUsers().then(response => {
                dispatch(setUsers(response));
            }).catch(error =>{
              console.log(error)
              setSnackbarOpen(true)
              setSnackbarMessage('Error occured')
              setSnackbarSeverity('error')
          })
      } catch (error) {
          console.log(error)
          setSnackbarOpen(true)
          setSnackbarMessage('Error occured')
          setSnackbarSeverity('error')
      }
    }

    const user = users.find((u) => u._id === book?.borrowedBy);

  return (
    <div className="max-w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-pink-900 mb-2">{book.title}</h2>
      <p className="text-gray-700 mb-4">Author: {book.author}</p>
      <p className="text-gray-600">{book.description}</p>
      
      <div className="mt-4">
        <span className="font-semibold">Published Year:</span> {book.publishedYear}
      </div>
      <div className="mt-2">
        <span className="font-semibold">Status:</span> {book?.borrowedBy ? `borrowed by ${user ? user.name : 'Unknown User'}` : 'available'}
      </div>
    </div>
  );
};

export default BookDetailCard;
