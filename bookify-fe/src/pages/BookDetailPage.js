import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersService from '../services/UsersService';
import { setUsers } from '../redux/usersSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetailCard from '../components/BookDetailCard';
import booksService from '../services/BooksService';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CustomSnackbar from '../components/CustomSnackbar';

const BookDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState('');
  const [bookDetail, setBookDetail] = useState({});
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');


  useEffect(() => {
    if (!users.length) {
      getAllUsers()
    }

    getBookById()

  }, [id, dispatch, users]);

  const getAllUsers = async () => {
    try {
      usersService.getAllUsers().then(response => {
        dispatch(setUsers(response));
      }).catch(error => {
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

  const getBookById = async () => {
    try {
      booksService.getBookById(id).then(response => {
        setBookDetail(response);
      }).catch(error => {
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


  const handleBorrow = () => {

    const userid = selectedUser;
    const bookid = id;

    try {
      usersService.borrowBook({ userid, bookid }).then(response => {
        getBookById(id);
        setSnackbarOpen(true)
        setSnackbarMessage("Book borrowed by user successfully!")
        setSnackbarSeverity('success')
      }).catch(error => {
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
  };

  return (
    <div className="max-w-[1080px] p-8 bg-pink-100 min-h-screen rounded-lg mx-auto">
      <div className="flex items-center mb-6">
        <ArrowBackIosNewIcon
          className="cursor-pointer text-pink-950 mr-2"
          onClick={() => navigate('/books')}
        />
        <h1 className="text-4xl font-bold text-pink-950 tracking-wide">Book Detail</h1>
      </div>
      <div className="bg-pink-50 shadow-md rounded-xl p-6 mb-8">
        <BookDetailCard book={bookDetail} />
      </div>

      {!bookDetail.borrowedBy && (
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select User to Borrow:
          </label>
          <div className="flex items-center">
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-500 h-10 py-2 mr-2"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleBorrow}
              className="bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-500 transition duration-200 h-10"
              disabled={!selectedUser}
            >
              Borrow
            </button>
          </div>
        </div>
      )}

      {snackbarOpen &&
        <CustomSnackbar
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
        />

      }
    </div>

  );
};

export default BookDetailPage;
