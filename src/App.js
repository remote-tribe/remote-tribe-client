import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import Modal from 'react-modal';
import { HomePage } from './pages/HomePage';
import { useState, useEffect } from 'react';
import { UserPage } from './pages/UserPage';
import { NavBar } from './components/NavBar';
import { UsersPage } from './pages/UsersPage';
import { InboxPage } from './pages/InboxPage';
import { SignInPage } from './pages/SignInPage';
import { ProfilePage } from './pages/ProfilePage';
import { CommunityPage } from './pages/CommunityPage';
import UserContextProvider from './context/UserContext';
import ArticleUpdatePage from './pages/ArticleUpdatePage';
import ArticleDetailsPage from './pages/ArticleDetailsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
Modal.setAppElement('#root');
function App() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        window.addEventListener('load', () => {
            setIsLoading(false);
        });
    }, []);
    return (_jsx(UserContextProvider, { children: _jsx("div", { className: 'App min-h-screen overflow-x-hidden bg-gray-100 dark:bg-gray-800 ', children: _jsxs(BrowserRouter, { children: [_jsx(NavBar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(HomePage, {}) }), _jsx(Route, { path: '/users/:userId', element: _jsx(UserPage, {}) }), _jsx(Route, { path: '/inbox', element: _jsx(InboxPage, {}) }), _jsx(Route, { path: '/users', element: _jsx(UsersPage, {}) }), _jsx(Route, { path: '/signin', element: _jsx(SignInPage, {}) }), _jsx(Route, { path: '/profile', element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: '/community', element: _jsx(CommunityPage, {}) }), _jsx(Route, { path: '/community/article/:articleId/edit', element: _jsx(ArticleUpdatePage, {}) }), _jsx(Route, { path: '/community/article/:articleId', element: _jsx(ArticleDetailsPage, {}) })] })] }) }) }));
}
export default App;
