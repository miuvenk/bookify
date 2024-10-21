import React, { useEffect, useState } from 'react'
import CustomTable from '../components/CustomTable';
import booksService from '../services/BooksService';
import { setBooks } from '../redux/booksSlice';
import { useDispatch, useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomSnackbar from '../components/CustomSnackbar';

const BooksPage = () => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        publishedYear: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');

    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        {
            field: 'title',
            headerName: 'title',
            width: 150,
        },
        {
            field: 'author',
            headerName: 'Author',
            width: 150,
        },
        {
            field: 'publishedYear',
            headerName: 'Published Year',
            width: 150,
        },
        {
            field: 'averageScore',
            headerName: 'Average Score',
            valueGetter: (value, row) => row.score === -1 ?
                "Not Scored"
                : `${row.score / row.ratingCount}`,
            width: 150,
        },
        {
            field: 'isBorrowed',
            headerName: 'Borrowed',
            width: 150,
            type: 'boolean',
            valueGetter: (value, row) => row.borrowedBy ? true : false,
        },
        {
            field: 'actions', headerName: 'Detail', width: 100, renderCell: (params) => {
                return (
                    <div className='cursor-pointer' onClick={() => navigate(`/books/${params.row._id}`)}>
                        <MoreVertIcon />
                    </div>
                );
            }
        }
    ];

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books);

    useEffect(() => {
        getAllBooks()
    }, [isModalOpen])


    const getAllBooks = async () => {
        try {
            booksService.getAllBooks().then(response => {
                //setLoading(true)
                dispatch(setBooks(response));
                //setLoading(false)
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        booksService.createBook(bookData)
            .then(response => {
                setSnackbarOpen(true)
                setSnackbarMessage("Book created successfully!")
                setSnackbarSeverity('success')
                setIsModalOpen(false);
                setBookData({ title: '', author: '', publishedYear: '' });
            })
            .catch(error => {
                console.log("Error creating user:", error);
            });
    };

    return (
        <div className="max-w-[1080px] p-8 bg-pink-100 min-h-screen rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-pink-950 tracking-wide">Books</h1>
                <AddCircleIcon
                    className="bg-pink-600 text-white rounded-full hover:bg-pink-500 transition duration-200"
                    onClick={() => setIsModalOpen(true)}
                >
                </AddCircleIcon>
            </div>

            <div className="bg-pink-50 shadow-md rounded-xl p-4">
                <div>
                    <CustomTable
                        rows={books}
                        columns={columns}
                        checkboxSelection={false}
                    />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={bookData.title}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={bookData.author}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Published Year</label>
                                <input
                                    type="number"
                                    name="publishedYear"
                                    value={bookData.publishedYear}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-700 p-2 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-pink-600 text-white p-2 rounded-md hover:bg-pink-500 transition duration-200"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
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
    )
}

export default BooksPage