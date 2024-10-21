import React, { useEffect, useState } from 'react'
import CustomTable from '../components/CustomTable';
import usersService from '../services/UsersService';
import { setUsers } from '../redux/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomSnackbar from '../components/CustomSnackbar';


const UsersPage = () => {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        age: ''
    });

    const columns = [
        { field: '_id', headerName: 'ID', width: 300 },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'age',
            headerName: 'Age',
            width: 110,
        },
        { field: 'actions', headerName: 'Detail', width: 100, renderCell: (params) => {
            return (
                <div className='cursor-pointer' onClick={() => navigate(`/users/${params.row._id}`)}>
                    <MoreVertIcon/>
                </div>
            );
          } }
    ];

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('');


    useEffect(() => {
        getAllUsers()
    }, [isModalOpen])


    const getAllUsers = async () => {
        try {
            usersService.getAllUsers().then(response => {
                //setLoading(true)
                dispatch(setUsers(response));
                //setLoading(false)
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        usersService.createUser(userData)
            .then(response => {
                setSnackbarOpen(true)
                setSnackbarMessage("User created successfully!")
                setSnackbarSeverity('success')
                setIsModalOpen(false);
                setUserData({ name: '', email: '', age: '' });
            })
            .catch(error => {
                setSnackbarOpen(true)
                setSnackbarMessage("Error creating user:", error)
                setSnackbarSeverity('error')
            });
    };

    return (
        <div className="max-w-[1080px] p-8 bg-pink-100 min-h-screen rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-pink-950 tracking-wide">Users</h1>
                <AddCircleIcon
                    className="bg-pink-600 text-white rounded-full hover:bg-pink-500 transition duration-200"
                    onClick={() => setIsModalOpen(true)}
                >
                </AddCircleIcon>
            </div>
            <div className="bg-pink-50 shadow-md rounded-xl p-4">
                <div>
                    <CustomTable
                        rows={users}
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={userData.age}
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

export default UsersPage