import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersPage from '../pages/UsersPage';
import BooksPage from '../pages/BooksPage';
import UserDetailPage from '../pages/UserDetailPage';
import BookDetailPage from '../pages/BookDetailPage';

const AppRoutes = () => {
  return (
        <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
  );
};

export default AppRoutes;
