export const NetworkAPI = {

    GET_ALL_USERS: '/users',
    GET_USER_BY_ID: '/users/',
    CREATE_USER: '/users/create',
    BORROW_BOOK: '/users/:userid/borrow/:bookid',
    RETURN_BOOK:'/users/:userid/return/:bookid',

    GET_ALL_BOOKS: '/books',
    GET_BOOK_BY_ID:'/books/',
    CREATE_BOOK:'/books/create'
}