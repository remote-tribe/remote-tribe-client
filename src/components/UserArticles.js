import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
export const UserArticles = ({ handleShowArticlesSettings, userData, }) => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        getAllArticles();
    }, []);
    const getAllArticles = () => {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/api/users/${userData._id}/articles`)
            .then(({ data }) => {
            setArticles(data.articles.reverse());
        })
            .catch((e) => {
            console.log('fail to access database..', e);
        });
    };
    return (_jsxs("div", { className: 'fade-in-2 mt-6', children: [_jsx("div", { className: 'mx-auto my-8 flex w-10/12 flex-wrap justify-center space-x-12', children: _jsx("button", { onClick: handleShowArticlesSettings, className: ' cursor-pointer p-3 font-normal text-sky-400 transition-all duration-150 hover:text-sky-500', children: _jsx("i", { className: 'fa-solid fa-arrow-left text-3xl' }) }) }), articles && (_jsx("div", { className: 'mx-auto flex w-10/12 flex-wrap  justify-center', children: articles?.map((article, index) => (_jsxs(Link, { to: `/community/article/${article?._id}`, className: 'mx-12 mb-16 flex h-96 w-96 cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-600 dark:text-gray-50 dark:hover:shadow-slate-700', children: [article?.imageUrl ? (_jsx("img", { className: 'h-64 w-full object-cover object-center', src: article?.imageUrl, alt: article?.title })) : (_jsx("div", { className: 'h-64 w-full bg-gradient-to-tl from-sky-300 to-sky-700 object-cover object-center dark:from-sky-500 dark:to-sky-900 ' })), _jsxs("div", { className: 'flex justify-between px-4 py-4', children: [_jsx("div", { className: 'text-xl font-semibold', children: article?.title }), _jsx("span", { className: ' px-2 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300', children: new Date(article?.createdAt).toLocaleDateString('en-GB') })] }), _jsx("div", { className: 'ml-3 mt-auto flex justify-between', children: _jsxs("div", { className: 'space-x-4 text-lg ', children: [_jsxs("span", { className: 'space-x-1 text-xl text-gray-600 dark:text-gray-200', children: [_jsx("i", { className: 'fa-solid fa-thumbs-up mx-1 mb-2 text-sky-400' }), article?.likes] }), _jsxs("span", { className: 'space-x-1  text-gray-600 dark:text-gray-200', children: [_jsx("i", { className: 'fa-solid fa-comment mx-1 mb-2 text-sky-400' }), article?.comments?.length] })] }) })] }, index))) }))] }));
};
