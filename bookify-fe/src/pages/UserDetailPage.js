import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../redux/booksSlice';
import booksService from '../services/BooksService';
import usersService from '../services/UsersService';
import CustomTable from '../components/CustomTable';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserDetailCard from '../components/UserDetailCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CustomSnackbar from '../components/CustomSnackbar';

const UserDetailPage = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books);
    const [userDetail, setUserDetail] = useState({})
    const [pastBorrowedBooksIds, setPastBorrowedBooksIds] = useState([])
    const [pastBorrowedBooks, setPastBorrowedBooks] = useState([]);
    const [presentBorrowedBooksIds, setPresentBorrowedBooksIds] = useState([])
    const [presentBorrowedBooks, setPresentBorrowedBooks] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedBookDetail, setSelectedBookDetail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [score, setScore] = useState(1);
    const [fetchData, setFetchData] = useState(true);
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');


    const columnsPast = [
        { field: 'bookId', headerName: 'Book Id', width: 100 },
        {
            field: 'title',
            headerName: 'Title',
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
            field: 'userScore',
            headerName: 'User Score',
            width: 150,
        },
        {
            field: 'actions', headerName: 'Detail', width: 100, renderCell: (params) => {
                return (
                    <div className='cursor-pointer' onClick={() => navigate(`/books/${params.row.bookId}`)}>
                        <MoreVertIcon />
                    </div>
                );
            }
        }
    ];

    const columnsPresent = [
        { field: '_id', headerName: 'Book Id', width: 100 },
        {
            field: 'title',
            headerName: 'Title',
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
            valueGetter: (value, row) =>
                row.score === -1 ?
                    "Not Scored"
                    : `${row.score / row.ratingCount}`
            ,
            width: 150,
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

    useEffect(() => {
        if (!books.length) {
            getAllBooks()
        }

        getUserById()

    }, [id, books, dispatch, fetchData]);

    useEffect(() => {
        if (pastBorrowedBooksIds.length && books.length) {
            const filteredWithScores = pastBorrowedBooksIds.map(borrowedBook => {
                const book = books.find(book => book._id === borrowedBook.bookId);
                return book
                    ? {
                        ...book,
                        _id: borrowedBook._id,
                        bookId: borrowedBook.bookId,
                        userScore: borrowedBook.userScore,
                    }
                    : null;
            }).filter(book => book !== null);

            setPastBorrowedBooks(filteredWithScores);
        }
    }, [books, pastBorrowedBooksIds, fetchData]);

    useEffect(() => {
        if (books.length) {
            const filteredPresentBooks = presentBorrowedBooksIds.map(borrowedBook => {
                const book = books.find(book => book._id === borrowedBook);
                return book || null;
            }).filter(book => book !== null);

            setPresentBorrowedBooks(filteredPresentBooks);
        }
    }, [books, presentBorrowedBooksIds, fetchData]);

    const getAllBooks = async () => {
        try {
            booksService.getAllBooks().then(response => {
                dispatch(setBooks(response));
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

    const getUserById = async () => {
        try {
            usersService.getUserById(id).then(response => {
                setUserDetail(response);
                setPastBorrowedBooksIds(response.books.pastBorrowedBooks)
                setPresentBorrowedBooksIds(response.books.presentBorrowedBooks)
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

    const returnBook = async (score) => {

        const userid = id;
        const bookid = selectedBookDetail._id

        try {
            usersService.returnBook({ userid, bookid }, { score }).then(response => {
                getUserById()
                setFetchData(prevFetchData => !prevFetchData)
                setSelectedRow([]);
                setSelectedBookDetail(null);
                setScore(1)
                setIsModalOpen(false);
                setSnackbarOpen(true)
                setSnackbarMessage("Book returned successfully!")
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
    }

    const handleScoreSubmit = () => {
        returnBook(score)
    };

    const handleReturn = () => {
        try {
            booksService.getBookById(selectedRow[0]).then(response => {
                setSelectedBookDetail(response);
                console.log(response)
                setIsModalOpen(true)
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

    return (
        <div className="max-w-[1080px] p-8 bg-pink-100 min-h-screen rounded-lg mx-auto">
            <div className="flex items-center mb-6">
                <ArrowBackIosNewIcon
                    className="cursor-pointer text-pink-950 mr-2"
                    onClick={() => navigate('/users')}
                />
                <h1 className="text-4xl font-bold text-pink-950 tracking-wide">User Detail</h1>
            </div>
            <div className="bg-pink-50 shadow-md rounded-xl p-6 mb-8">
                <UserDetailCard user={userDetail} />
            </div>

            <div className="flex flex-col md:flex-row justify-between mb-8 space-x-4 overflow-x-auto">
                <div className="bg-white shadow-md rounded-xl p-6 flex-1 max-w-[500px]">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-800">Past Borrowed Books</h2>
                    <div className="overflow-x-auto">
                        <CustomTable
                            columns={columnsPast}
                            rows={pastBorrowedBooks}
                            checkboxSelection={false}
                        />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 flex-1 max-w-[500px]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-pink-800">Present Borrowed Books</h2>
                        <button
                            onClick={handleReturn}
                            disabled={!selectedRow}
                            className={`bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 
                        ${selectedRow.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-500 cursor-pointer'}`}
                        >
                            Return
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <CustomTable
                            columns={columnsPresent}
                            rows={presentBorrowedBooks}
                            setSelection={setSelectedRow}
                            selection={selectedRow}
                            checkboxSelection={true}
                        />
                    </div>
                </div>
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Score {selectedBookDetail.title}</h3>

                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={score}
                            onChange={(e) => setScore(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-center mt-2">Score: {score}</div>

                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-pink-600 text-white px-4 py-2 rounded-lg"
                                onClick={handleScoreSubmit}
                            >
                                Submit
                            </button>
                        </div>
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

export default UserDetailPage