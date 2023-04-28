import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
export const UserFollowers = ({ userData }) => {
    const [userFollowers, setUserFollowers] = useState([]);
    const fetchFollowingUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${userData?._id}/followers`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserFollowers(response.data);
        }
        catch (err) {
            console.error('Error fetching following users: ', err);
        }
    };
    useEffect(() => {
        fetchFollowingUsers();
    }, []);
    return (_jsx("div", { className: 'fade-in-2 flex w-full justify-center', children: userFollowers && (_jsxs("table", { className: 'my-8 w-3/4 text-center text-2xl  ', children: [_jsx("thead", { className: 'h-16', children: _jsxs("tr", { className: 'bg-gray-100 shadow dark:bg-slate-800 ', children: [_jsx("th", { className: 'w-1/4', children: _jsx("i", { className: 'fa-sharp fa-solid fa-image text-2xl text-sky-500' }) }), _jsx("th", { className: 'w-1/4', children: _jsx("i", { className: 'fa-solid fa-user text-2xl text-sky-500' }) }), _jsx("th", { className: 'w-1/4', children: _jsx("i", { className: 'fa-solid fa-briefcase  text-2xl text-sky-500 ' }) }), _jsx("th", { className: 'w-1/4', children: _jsx("i", { className: 'fas fa-solid fa-location-dot text-2xl text-sky-500 ' }) })] }) }), _jsx("tbody", { children: userFollowers?.map((user, index) => (_jsxs("tr", { className: 'm-2 h-12 rounded-md shadow dark:shadow-slate-800', children: [_jsx("td", { className: 'w-1/4 dark:bg-slate-600', children: _jsxs(Link, { to: `/users/${user?._id}`, children: [' ', _jsx("img", { src: user?.profilePicture, className: 'mx-auto h-8 w-8 rounded-full' })] }) }), _jsx("td", { className: 'w-1/4 dark:bg-slate-600', children: _jsx(Link, { to: `/users/${user?._id}`, className: 'text-sky-500 transition-all duration-150 hover:text-sky-600 ', children: user?.username }) }), _jsx("td", { className: 'w-1/4 dark:bg-slate-600', children: _jsx("p", { className: 'text-gray-600 dark:text-gray-300', children: user?.profession }) }), _jsx("td", { className: 'w-1/4 dark:bg-slate-600', children: _jsxs("span", { className: 'dark:text-gray-300', children: [user?.location?.city, user?.location?.city && user?.location?.country && ', ', user?.location?.country] }) })] }, index))) })] })) }));
};
