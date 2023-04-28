import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { UserProfile } from '../components/UserProfile';
import { UserSettings } from '../components/UserSettings';
import { UserArticles } from '../components/UserArticles';
import { UserFollowing } from '../components/UserFollowing';
import { UserFollowers } from '../components/UserFollowers';
import { AccountSettings } from '../components/AccountSettings';
import axios from 'axios';
import { GetCurrentUser } from '../Auth';
import { FadeLoader } from 'react-spinners';
const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};
export const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [loadingImg, setLoadingImg] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [showFollowing, SetShowFollowing] = useState(false);
    const [showFollowers, SetShowFollowers] = useState(false);
    const [uploadedImageURL, setUploadedImageURL] = useState('');
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showArticlesSettings, setShowArticlesSettings] = useState(false);
    const fileInputRef = useRef(null);
    const currentUser = GetCurrentUser();
    const token = localStorage.getItem('token');
    const { handleLogout } = useContext(UserContext);
    const isCurrentUser = userData?._id === currentUser?.id;
    useEffect(() => {
        if (uploadedImageURL) {
            updateUserImage();
        }
    }, [uploadedImageURL]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && currentUser) {
            fetchData();
        }
    }, [showSettings, uploadedImage]);
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/current`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(data);
        }
        catch (error) {
            console.error(error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                handleLogout();
            }
        }
        finally {
            setLoading(false);
        }
    };
    const updateUserImage = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/current`, {
                profilePicture: uploadedImageURL,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        catch (err) {
            console.error('Error updating user profile: ', err);
        }
    };
    // Image handling
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleImageChange = async (e) => {
        try {
            const selectedImage = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(selectedImage);
            await handleImageUpload(selectedImage);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoadingImg(false);
        }
    };
    const handleImageUpload = async (image) => {
        if (!image) {
            return;
        }
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'fsgqertv');
        try {
            setLoadingImg(true);
            const response = await axios.post('https://api.cloudinary.com/v1_1/dxeejm8ef/image/upload', formData);
            const uploadedImageUrl = response.data.url;
            const transformedUrl = `${uploadedImageUrl.replace('/image/upload/', '/image/upload/c_fill,ar_1:1,h_160,w_160/')}`;
            setUploadedImageURL(uploadedImageUrl);
            setUploadedImage(transformedUrl);
            setLoadingImg(false);
        }
        catch (error) {
            setLoadingImg(false);
            console.error('Error uploading image:', error);
        }
    };
    //Profile sections render handling
    const handleShowSettings = () => {
        setShowSettings(!showSettings);
        setShowArticlesSettings(false);
        SetShowFollowing(false);
        SetShowFollowers(false);
    };
    const handleShowAccountSettings = () => {
        setShowAccountSettings(!showAccountSettings);
        setShowArticlesSettings(false);
        SetShowFollowing(false);
        SetShowFollowers(false);
    };
    const handleShowArticlesSettings = () => {
        setShowArticlesSettings(!showArticlesSettings);
        setShowSettings(false);
        setShowAccountSettings(false);
        SetShowFollowing(false);
        SetShowFollowers(false);
    };
    const handleShowFollowingSettings = () => {
        SetShowFollowing(!showFollowing);
        setShowSettings(false);
        setShowAccountSettings(false);
        setShowArticlesSettings(false);
        SetShowFollowers(false);
    };
    const handleShowFollowersSettings = () => {
        SetShowFollowers(!showFollowers);
        SetShowFollowing(false);
        setShowSettings(false);
        setShowAccountSettings(false);
        setShowArticlesSettings(false);
    };
    return loading ? (_jsx("div", { className: 'mt-60 flex justify-center text-center text-sky-400 ', children: _jsx(FadeLoader, { color: '#00a8e8', loading: loading, css: override, size: 150 }) })) : (_jsx(_Fragment, { children: _jsxs("main", { className: 'profile-page ', children: [_jsxs("section", { className: 'relative block h-80', children: [_jsx("div", { className: 'h-full w-full bg-cover bg-center', children: _jsx("span", { className: 'absolute h-full w-full bg-sky-400 opacity-50 dark:bg-sky-800' }) }), _jsx("div", { className: 'pointer-events-none absolute bottom-0 left-0 right-0 top-auto h-16 w-full overflow-hidden', children: _jsx("svg", { className: 'absolute bottom-0 overflow-hidden ', xmlns: 'http://www.w3.org/2000/svg', preserveAspectRatio: 'none', version: '1.1', viewBox: '0 0 2560 100', x: '0', y: '0' }) })] }), userData && (_jsx("section", { className: 'relative bg-gray-100 py-16 dark:bg-gray-800 dark:text-gray-200  ', children: _jsx("div", { className: 'container mx-auto px-4 ', children: _jsx("div", { className: 'relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg dark:bg-slate-700', children: _jsxs("div", { className: 'px-6', children: [_jsxs("div", { className: 'flex flex-wrap justify-center', children: [_jsxs("div", { className: 'flex w-full justify-center px-4 lg:order-2 lg:w-3/12 ', children: [_jsx("input", { className: '', type: 'file', accept: 'image/*', ref: fileInputRef, onChange: handleImageChange, style: { display: 'none' } }), isCurrentUser ? (_jsx(_Fragment, { children: loadingImg ? (_jsx(FadeLoader, { color: '#00a8e8', loading: loading, css: override, size: 50 })) : (_jsxs(_Fragment, { children: [_jsx("img", { alt: '...', src: userData?.profilePicture, className: 'fade-in-2 absolute z-10 -m-16 -ml-20 h-40 w-40 cursor-pointer rounded-full border-none object-cover align-middle shadow-xl lg:-ml-16', onClick: handleImageClick }), _jsx("div", { onClick: handleImageClick, className: 'fade-in-2 group absolute z-10 \r\n\t\t\t\t\t\t\t\t\t\t\t\t\t-m-16 -ml-20 h-40 w-40 cursor-pointer rounded-full border-none bg-transparent object-cover align-middle shadow-xl transition-all duration-300 hover:bg-white hover:bg-opacity-40 lg:-ml-16', children: _jsx("svg", { className: 'h-12 w-12 text-transparent transition-all duration-300 group-hover:text-white', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', children: _jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M12 6v6m0 0v6m0-6h6m-6 0H6' }) }) })] })) })) : (_jsx("img", { alt: '...', src: userData?.profilePicture, className: 'fade-in-2 absolute z-10 -m-16 -ml-20 h-40 w-40 rounded-full border-none object-cover align-middle  shadow-xl lg:-ml-16' }))] }), _jsx("div", { className: 'w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right', children: _jsx("div", { className: 'mt-32 px-3 py-6 sm:mt-0', children: !showSettings && (_jsx("div", { className: 'mt-32 px-3 py-6 sm:mt-0', children: _jsx("button", { onClick: handleShowSettings, className: 'fade-in-2 mb-1 rounded bg-sky-500 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2', type: 'button', children: "Settings" }) })) }) }), _jsx("div", { className: 'fade-in-2 w-full px-4 lg:order-1 lg:w-4/12 ', children: _jsxs("div", { className: 'flex justify-center py-4 pt-8 lg:pt-4', children: [_jsxs("div", { className: 'p-3 text-center lg:mr-4', children: [_jsx(Link, { to: '', className: ' block text-xl font-bold uppercase tracking-wide  ', children: _jsx("button", { onClick: handleShowFollowersSettings, className: 'border-none bg-transparent text-2xl font-bold text-sky-500  transition-all duration-150 ease-linear hover:text-sky-700 dark:text-sky-400', type: 'button', children: userData.followers?.length }) }), _jsx("span", { className: 'text-md ', children: "Followers" })] }), _jsxs("div", { className: 'mr-4 p-3 text-center', children: [_jsx(Link, { to: '', className: 'block text-xl font-bold uppercase tracking-wide ', children: _jsx("button", { onClick: handleShowFollowingSettings, className: 'border-none bg-transparent text-2xl font-bold text-sky-500  transition-all duration-150 ease-linear hover:text-sky-700 dark:text-sky-400', type: 'button', children: userData.following?.length }) }), _jsx("span", { className: 'text-md ', children: "Following" })] }), _jsxs("div", { className: 'mr-4 p-3 text-center', children: [_jsx(Link, { to: '', className: 'block text-xl font-bold uppercase tracking-wide ', children: _jsx("button", { onClick: handleShowArticlesSettings, className: 'border-none bg-transparent text-2xl font-bold text-sky-500  transition-all duration-150 ease-linear hover:text-sky-700 dark:text-sky-400', type: 'button', children: userData.articles?.length }) }), _jsx("span", { className: 'text-md ', children: "Articles" })] })] }) })] }), showAccountSettings && (_jsx(AccountSettings, { userData: userData, handleShowAccountSettings: handleShowAccountSettings })), showSettings && !showAccountSettings && (_jsx(UserSettings, { userData: userData, handleShowSettings: handleShowSettings, handleShowAccountSettings: handleShowAccountSettings })), showArticlesSettings && (_jsx(UserArticles, { userData: userData, handleShowArticlesSettings: handleShowArticlesSettings })), showFollowing && _jsx(UserFollowing, { userData: userData }), showFollowers && _jsx(UserFollowers, { userData: userData }), !showSettings &&
                                        !showAccountSettings &&
                                        !showArticlesSettings &&
                                        !showFollowers &&
                                        !showFollowing && _jsx(UserProfile, { userData: userData })] }) }) }) }))] }) }));
};
