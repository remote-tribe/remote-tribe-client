import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReportModal } from './ReportModal';
export const Conversation = ({ userData, currentUser, fetchUser, fetchCurrentUser, setShowChats, }) => {
    const [chat, setChat] = useState({
        participants: [],
        _id: '',
        messages: [],
    });
    const [message, setMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [error, setError] = useState('');
    // Local storage token and navigation
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    // Toggle menu open/close state
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    // Delete conversation
    const deleteConversation = async (e) => {
        e.preventDefault();
        const id = chat?._id;
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/conversation?conversationId=${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate(location.pathname, {});
            fetchCurrentUser();
        }
        catch (error) {
            console.log(error);
        }
    };
    // Get conversation data
    useEffect(() => {
        const conversation = userData?.conversations?.find((conversation) => {
            return conversation?.participants?.some((participant) => {
                return participant._id === currentUser?._id;
            });
        });
        setChat(conversation);
    }, [userData, currentUser]);
    // Handle message submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/conversation`, {
                senderId: currentUser?._id,
                recipientId: userData?._id,
                message,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUser(userData?._id);
            setMessage('');
        }
        catch (error) {
            console.log(error);
        }
    };
    // Close report modal
    const closeReportModal = () => {
        setReportModalOpen(false);
    };
    // Handle report submission
    const handleReport = async (report, id) => {
        closeReportModal();
        if (report == '') {
            setError('Text field cannot be empty.');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/report`, {
                content: report,
                id: id,
            });
            setNotification(response?.data?.message);
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
        catch (error) {
            console.log(error);
        }
    };
    return (_jsx("div", { className: 'h-full w-full   ', onClick: () => isMenuOpen && setIsMenuOpen(false), children: _jsx("div", { className: '  h-full bg-gradient-to-br from-sky-500 to-transparent shadow-lg ', children: userData && (_jsxs("div", { onClick: () => {
                    if (window.innerWidth < 768) {
                        setShowChats(false);
                    }
                }, className: 'p:2 last fade-in-2 flex h-full flex-1 flex-col justify-between  sm:p-6  ', children: [reportModalOpen && (_jsx(ReportModal, { handleReport: handleReport, isOpen: reportModalOpen, closeModal: closeReportModal })), _jsxs("div", { className: 'flex justify-between border-b border-sky-300 py-3 dark:border-sky-500 sm:items-center', children: [_jsxs(Link, { to: `/users/${userData?._id}`, className: 'relative ml-2 flex cursor-pointer items-center space-x-4 md:ml-0 ', children: [_jsx("img", { src: userData?.profilePicture, alt: '', className: 'h-10 w-10 rounded-full sm:h-16 sm:w-16' }), _jsxs("div", { className: 'flex flex-col leading-tight text-white transition-all duration-150 hover:text-sky-700 dark:text-white dark:hover:text-sky-900 ', children: [_jsx("div", { className: 'mt-1 flex items-center text-2xl ', children: _jsx("span", { className: ' mr-3  ', children: userData?.username }) }), _jsx("span", { className: 'dark:hover:white text-lg text-white hover:text-white dark:hover:text-white ', children: userData?.profession })] })] }), _jsxs("div", { className: 'relative', children: [_jsx("button", { type: 'button', onClick: toggleMenu, className: 'mr-4 inline-flex h-8 w-8 scale-125 items-center justify-center rounded-full text-sky-700 transition duration-500 ease-in-out focus:outline-none hover:bg-sky-200 dark:text-sky-500 dark:hover:bg-sky-900', children: _jsx("i", { className: 'fa-solid fa-ellipsis-vertical' }) }), isMenuOpen && (_jsxs("div", { className: 'absolute right-0 mt-2  w-48  shadow-lg', children: [_jsx(Link, { to: `/users/${userData?._id}`, className: 'text-md block w-full bg-white px-4 py-3 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-700', children: "View Profile" }), _jsx("button", { onClick: () => setReportModalOpen(chat?._id), className: 'text-md block w-full border-b  bg-white px-4 py-3 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-700', children: "Report" }), _jsx("button", { onClick: deleteConversation, className: 'text-md block w-full bg-white px-4 py-3 text-left text-rose-500 hover:bg-gray-100  dark:bg-gray-600 dark:hover:bg-gray-700', children: "Delete Conversation" })] }))] })] }), notification && (_jsx("div", { className: 'fade-in-2 relative mx-auto my-3 w-fit rounded border border-green-400 bg-green-100 px-8 py-3 text-green-700 dark:border-green-700 dark:bg-green-500 dark:text-white', role: 'alert', children: _jsx("span", { className: 'block sm:inline', children: notification }) })), error && (_jsx("div", { className: 'fade-in-2 relative mx-auto my-3 w-fit rounded border border-red-400 bg-red-100 px-8 py-3 text-red-700 dark:border-red-700 dark:bg-red-500 dark:text-white', role: 'alert', children: _jsx("span", { className: 'block sm:inline', children: error }) })), _jsx("div", { id: 'messages', className: 'scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex h-full flex-col space-y-4 overflow-y-auto p-3', children: chat?.messages?.map((message, index) => (_jsx("div", { className: 'chat-message', children: message?.sender === currentUser?._id ? (_jsxs("div", { className: 'flex items-end', children: [_jsx("div", { className: 'text-md order-2 mx-2 flex max-w-xs flex-col items-start space-y-2', children: _jsx("div", { children: _jsx("span", { className: 'inline-block rounded-lg rounded-br-none bg-sky-600 px-4 py-2 text-white dark:bg-sky-700 ', children: message?.message }) }) }), _jsx("img", { src: currentUser?.profilePicture, alt: 'My profile', className: 'order-1 h-6 w-6 rounded-full' })] })) : (_jsxs("div", { className: 'flex items-end justify-end', children: [_jsx("div", { className: 'text-md order-1 mx-2 flex max-w-xs flex-col items-end space-y-2', children: _jsx("div", { children: _jsx("span", { className: 'inline-block rounded-lg rounded-bl-none bg-gray-200 px-4 py-2 text-gray-600 dark:bg-gray-500 dark:text-gray-50', children: message?.message }) }) }), _jsx("img", { src: userData?.profilePicture, alt: 'My profile', className: 'order-1 h-6 w-6 rounded-full' })] })) }, index))) }), _jsx("form", { onSubmit: handleSubmit, children: _jsx("div", { className: ' border-gray-200 px-4 pb-6 pt-4 sm:mb-0 md:pb-0 ', children: _jsxs("div", { className: 'relative flex transition-all duration-150  ', children: [_jsx("span", { className: 'absolute inset-y-0 flex items-center', children: _jsx("button", { type: 'button', className: 'inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out  focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-500', children: _jsx("svg", { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', className: 'h-6 w-6 text-gray-600 dark:text-gray-400', children: _jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' }) }) }) }), _jsx("input", { type: 'text', placeholder: 'Write your message!', className: 'w-full rounded-lg bg-gray-200 py-3 pl-12  text-gray-600 placeholder-gray-600 outline-none transition-all duration-150   focus:outline-none dark:bg-gray-600 dark:text-gray-200 dark:placeholder-gray-400', id: 'message', name: 'message', value: message, onChange: (e) => setMessage(e.target.value) }), _jsxs("div", { className: 'absolute inset-y-0 right-0  items-center rounded-lg sm:flex', children: [_jsx("button", { type: 'button', className: 'hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-500 sm:inline-flex', children: _jsx("svg", { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', className: 'h-6 w-6 text-gray-600 dark:text-gray-400', children: _jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13' }) }) }), _jsx("button", { type: 'button', className: 'hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-500 sm:inline-flex', children: _jsxs("svg", { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', className: 'h-6 w-6 text-gray-600 dark:text-gray-400', children: [_jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }), _jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M15 13a3 3 0 11-6 0 3 3 0 016 0z' })] }) }), _jsx("button", { type: 'button', className: 'hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-500 sm:inline-flex ', children: _jsx("svg", { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', className: 'h-6 w-6 text-gray-600 dark:text-gray-400', children: _jsx("path", { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }) }) }), _jsxs("button", { type: 'submit', className: 'inline-flex items-center justify-center rounded-e-lg bg-sky-600 px-4 py-3 text-white transition duration-500 ease-in-out focus:outline-none hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700', children: [_jsx("span", { className: 'font-bold', children: "Send" }), _jsx("svg", { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', className: 'ml-2 h-6 w-6 rotate-90 transform', children: _jsx("path", { d: 'M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' }) })] })] })] }) }) })] })) }) }));
};
