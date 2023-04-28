import { jsx as _jsx } from "react/jsx-runtime";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GetCurrentUser } from '../Auth';
import { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};
export const UsersPage = () => {
    const currentUser = GetCurrentUser();
    const currentUserId = currentUser?.id;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`);
                setLoading(false);
                setUsers(response.data);
            }
            catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchUsers();
    }, []);
    const filteredUsers = users.filter((user) => user?._id !== currentUserId);
    return loading ? (_jsx("div", { className: 'mt-60 flex justify-center text-center text-sky-400 ', children: _jsx(FadeLoader, { color: '#00a8e8', loading: loading, css: override, size: 150 }) })) : (_jsx("div", { className: 'mx-auto mt-10 flex flex-col items-center space-y-2 sm:max-w-md', children: filteredUsers?.map((user, index) => (_jsx(Link, { to: `/users/${user._id}`, className: 'w-full rounded bg-white text-center text-3xl shadow ', children: user?.username }, index))) }));
};
