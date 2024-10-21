import { Icon } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Sidepanel = () => {
    return (
        <div className="h-[calc(100vh-32px)] w-64 bg-pink-900 text-white fixed rounded-lg">
            <div className="flex items-center justify-center h-16 bg-pink-950 rounded-lg">
                <h1 className="text-3xl font-semibold tracking-widest">BOOKIFY</h1>
            </div>
            <ul className="mt-4">
                <li className="px-6 py-4 hover:bg-pink-800 transition duration-200">
                    <Link to="/users" className="block w-full h-full flex row items-center">
                        <GroupIcon/>
                        <span className='pl-4 text-xl'>Users</span>
                    </Link>
                </li>
                <li className="px-6 py-4 hover:bg-pink-800 transition duration-200">
                    <Link to="/books" className="block w-full h-full flex row items-center">
                        <AutoStoriesIcon/>
                        <span className='pl-4 text-xl'>Books</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidepanel