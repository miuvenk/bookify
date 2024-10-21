import React from 'react';

const UserDetailCard = ({ user }) => {
  return (
    <div className="max-w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="mt-2 text-gray-600">Email: {user.email}</p>
        <p className="mt-2 text-gray-600">Age: {user.age}</p>
        <p className="mt-2 text-gray-600">Past Borrowed Books: {user.books?.pastBorrowedBooks.length}</p>
        <p className="mt-2 text-gray-600">Present Borrowed Books: {user.books?.presentBorrowedBooks.length}</p>
      </div>
    </div>
  );
};

export default UserDetailCard;
