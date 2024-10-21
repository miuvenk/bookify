# Book Borrowing System

A full-stack application for managing users and books in a borrowing system. This application allows users to borrow and return books while tracking their borrowing history.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- User registration and management.
- Book management (add, edit, delete books).
- Borrow and return books.
- View borrowing history for users.
- Responsive UI built with React, Material UI and Tailwind CSS.

## Technologies Used

- **Frontend:**
  - React
  - Tailwind CSS
  - Material UI
  - Redux
  - Axios
  - Notistack

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/miuvenk/bookify.git

2. Open frontend project (bookify-fe):
   ```bash
   cd bookify-fe
   npm install
   npm start

3. Create .env file for frontend project:
   ```bash
   PORT = 3001

4. Open backend project (bookify-be):
   ```bash
   cd bookify-de
   npm install
   npm start

## Usage

 - Access the application in your browser at http://localhost:3001.
 - Create a new user and create a new book.
 - Manage books and users from their detail pages.
 - Borrow and return books for a user.

## API Endpoints

API_URL is 'http://localhost:3000'

  - GET_ALL_USERS: '/users'
  - GET_USER_BY_ID: '/users/'
  - CREATE_USER: '/users/create',
  - BORROW_BOOK: '/users/:userid/borrow/:bookid'
  - RETURN_BOOK:'/users/:userid/return/:bookid'

  - GET_ALL_BOOKS: '/books'
  - GET_BOOK_BY_ID:'/books/'
  - CREATE_BOOK:'/books/create'