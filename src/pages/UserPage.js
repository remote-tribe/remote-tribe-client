import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GetCurrentUser } from '../Auth';
import { useState, useEffect } from 'react';
import { FadeLoader } from 'react-spinners';
import { useParams, useNavigate } from 'react-router-dom';
import { UserArticles } from '../components/UserArticles';
import { UserFollowers } from '../components/UserFollowers';
import { UserFollowing } from '../components/UserFollowing';
const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};
export const UserPage = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const currentUser = GetCurrentUser();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [showProfile, setShowProfile] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const isCurrentUser = userData?._id === currentUser?.id;
    const [showFollowing, SetShowFollowing] = useState(false);
    const [showFollowers, SetShowFollowers] = useState(false);
    const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
    const [showArticlesSettings, setShowArticlesSettings] = useState(false);
    // Handles the "Follow" button click by making an API call to follow the user.
    const handleFollow = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/following`, {
                userId: userData?._id,
                currentUserId: currentUser?.id,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUser();
            fetchCurrentUserFollowing();
        }
        catch (err) {
            console.error('Error updating user profile: ', err);
        }
    };
    // Handles the "Unfollow" button click by making an API call to unfollow the user.
    const handleUnfollow = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/unfollowing`, {
                userId: userData?._id,
                currentUserId: currentUser?.id,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUser();
            fetchCurrentUserFollowing();
            console.log(response.data.message);
        }
        catch (err) {
            console.error('Error updating user profile: ', err);
        }
    };
    // Handles the "Message" button click by navigating to the user's inbox page.
    const handleMessage = () => {
        if (!token) {
            return navigate('/signin');
        }
        else
            navigate('/inbox', { state: { user: userData } });
    };
    // Fetches the list of users that the current user is following.
    const fetchCurrentUserFollowing = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${currentUser?.id}/following`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCurrentUserFollowing(response.data.following);
        }
        catch (err) {
            console.error('Error fetching user following list: ', err);
        }
    };
    useEffect(() => {
        fetchCurrentUserFollowing();
    }, []);
    // Determines whether the current user is following the displayed user.
    useEffect(() => {
        if (currentUserFollowing.includes(userData?._id)) {
            setIsFollowing(true);
        }
        else {
            setIsFollowing(false);
        }
    }, [currentUserFollowing, userData]);
    // Fetches the displayed user's data from the server
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user?userId=${userId}`);
            setLoading(false);
            setUserData(response.data);
        }
        catch (error) {
            setLoading(false);
            console.error(error);
        }
    };
    // Determines whether the current user is the displayed user and redirects them to their profile page.
    useEffect(() => {
        if (userId === currentUser?.id) {
            navigate('/profile');
        }
        fetchUser();
    }, []);
    const handleShowArticlesSettings = () => {
        setShowArticlesSettings(!showArticlesSettings);
        SetShowFollowing(false);
        SetShowFollowers(false);
        if (showProfile === true) {
            setShowProfile(false);
        }
    };
    const handleShowFollowingSettings = () => {
        SetShowFollowing(!showFollowing);
        setShowArticlesSettings(false);
        SetShowFollowers(false);
        if (showProfile === true) {
            setShowProfile(false);
        }
    };
    const handleShowFollowersSettings = () => {
        SetShowFollowers(!showFollowers);
        SetShowFollowing(false);
        setShowArticlesSettings(false);
        if (showProfile === true) {
            setShowProfile(false);
        }
    };
    return loading ? (_jsx("div", { className: 'mt-60 flex justify-center text-center text-sky-400 ', children: _jsx(FadeLoader, { color: '#00a8e8', loading: loading, css: override, size: 150 }) })) : (_jsx(_Fragment, { children: _jsxs("main", { className: 'profile-page', children: [_jsxs("section", { className: 'relative block h-80', children: [_jsx("div", { className: 'h-full w-full bg-cover bg-center', children: _jsx("span", { className: 'absolute h-full w-full bg-sky-400 opacity-50 dark:bg-sky-800' }) }), _jsx("div", { className: 'pointer-events-none absolute bottom-0 left-0 right-0 top-auto h-16 w-full overflow-hidden', children: _jsx("svg", { className: 'absolute bottom-0 overflow-hidden ', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'none', version: '1.1', viewBox: '0 0 2560 100', x: '0', y: '0' }) })] }), userData && (_jsx("section", { className: 'relative bg-gray-100 py-16 dark:bg-gray-800 ', children: _jsx("div", { className: 'container mx-auto px-4 ', children: _jsx("div", { className: 'relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg dark:bg-slate-700 dark:text-gray-200', children: _jsxs("div", { className: 'px-6', children: [_jsxs("div", { className: 'flex flex-wrap justify-center', children: [_jsx("div", { className: 'flex w-full justify-center px-4 lg:order-2 lg:w-3/12', children: _jsx("img", { alt: '...', src: userData?.profilePicture, className: 'fade-in-2 absolute z-10 -m-16 -ml-20 h-40 w-40 rounded-full border-none object-cover align-middle shadow-xl lg:-ml-16' }) }), _jsx("div", { className: 'w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right', children: _jsx("div", { className: 'mt-32 px-3 py-6 sm:mt-0', children: _jsx("div", { className: 'fade-in-2 mt-32 px-3 py-6 sm:mt-0', children: isCurrentUser ? (_jsx("button", { className: 'mb-1 rounded bg-sky-500 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2 ', type: 'button', children: "Settings" })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleMessage, className: 'mb-1 rounded bg-sky-400 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-500 hover:shadow-md sm:mr-2 ', type: 'button', children: "Message" }), isFollowing ? (_jsx("button", { onClick: handleUnfollow, className: 'mb-1 rounded bg-rose-500 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-rose-600 hover:shadow-md sm:mr-2 ', type: 'button', children: "Unfollow" })) : (_jsx("button", { onClick: handleFollow, className: 'mb-1 rounded bg-sky-600 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-700 hover:shadow-md sm:mr-2 ', type: 'button', children: "Follow" }))] })) }) }) }), _jsx("div", { className: 'w-full px-4 lg:order-1 lg:w-4/12', children: _jsxs("div", { className: 'fade-in-2 flex justify-center py-4 pt-8 lg:pt-4', children: [_jsxs("div", { className: 'p-3 text-center lg:mr-4 ', children: [_jsx(Link, { to: '', className: ' block text-xl font-bold uppercase tracking-wide  ', children: _jsx("button", { onClick: handleShowFollowersSettings, className: 'border-none bg-transparent text-2xl font-bold  text-sky-500 transition-all duration-150 ease-linear hover:text-sky-700', type: 'button', children: userData.followers?.length }) }), _jsx("span", { className: 'text-md ', children: "Followers" })] }), _jsxs("div", { className: 'mr-4 p-3 text-center', children: [_jsx(Link, { to: '', className: 'block text-xl font-bold uppercase tracking-wide ', children: _jsx("button", { onClick: handleShowFollowingSettings, className: 'border-none bg-transparent text-2xl font-bold  text-sky-500 transition-all duration-150 ease-linear hover:text-sky-700', type: 'button', children: userData.following?.length }) }), _jsx("span", { className: 'text-md ', children: "Following" })] }), _jsxs("div", { className: 'mr-4 p-3 text-center', children: [_jsx(Link, { to: '', className: 'block text-xl font-bold uppercase tracking-wide ', children: _jsx("button", { onClick: handleShowArticlesSettings, className: 'border-none bg-transparent text-2xl font-bold  text-sky-500 transition-all duration-150 ease-linear hover:text-sky-700', type: 'button', children: userData.articles?.length }) }), _jsx("span", { className: 'text-md ', children: "Articles" })] })] }) })] }), _jsxs("main", { className: 'profile-page', children: [userData && !showArticlesSettings && !showFollowers && !showFollowing && (_jsx("section", { className: 'relative block h-80', children: _jsx("div", { className: 'pointer-events-none absolute bottom-0 left-0 right-0 top-auto h-16 w-full overflow-hidden', children: _jsx("svg", { className: 'absolute bottom-0 overflow-hidden ', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'none', version: '1.1', viewBox: '0 0 2560 100', x: '0', y: '0' }) }) })), userData && !showArticlesSettings && !showFollowers && !showFollowing && (_jsx("div", { className: 'fade-in-2 relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words  rounded-lg bg-white dark:bg-slate-700 dark:text-gray-200', children: _jsxs("div", { className: 'px-6', children: [_jsx("div", { className: 'flex flex-wrap justify-center' }), _jsxs("div", { className: 'mt-12 text-center', children: [_jsx("h3", { className: 'mb-2 text-4xl font-semibold leading-normal ', children: userData?.username }), userData?.location && (_jsxs("div", { className: 'text-blueGray-400 mb-2 mt-10 text-sm font-bold uppercase leading-normal', children: [_jsx("i", { className: 'fas fa-solid fa-location-dot mr-2 text-2xl text-sky-500' }), userData?.location?.city, userData?.location?.city && userData?.location.country && ',', ' ', userData?.location?.country] })), _jsx("div", { className: 'text-blueGray-600 mb-2 mt-10 text-lg font-medium', children: userData?.profession && (_jsx("div", { className: 'text-blueGray-600 mb-2 mt-10 text-lg font-medium', children: _jsxs(Link, { to: ``, className: 'text-blueGray-500 font-normal transition-all hover:text-sky-400', children: [' ', userData?.profession] }) })) })] }), _jsx("div", { className: 'border-blueGray-200 mt-10 border-t pt-4 text-center dark:border-slate-600', children: _jsx("div", { className: 'flex flex-wrap justify-center', children: _jsx("div", { className: 'w-full px-4 lg:w-9/12', children: _jsx("p", { className: 'text-blueGray-700 mb-4 text-lg leading-relaxed', children: userData?.description }) }) }) })] }) })), showArticlesSettings && (_jsx(UserArticles, { userData: userData, handleShowArticlesSettings: handleShowArticlesSettings })), showFollowing && _jsx(UserFollowing, { userData: userData }), showFollowers && _jsx(UserFollowers, { userData: userData })] })] }) }) }) }))] }) }));
};
