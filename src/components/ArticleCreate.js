import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import axios from 'axios';
import { useState } from 'react';
import { GetCurrentUser } from '../Auth';
import { Editor } from './Editor';
import { FadeLoader } from 'react-spinners';
const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};
const CreateArticle = ({ handleShowCreate, loadAllArticles, }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const currentUser = GetCurrentUser();
    //Image handling
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
        handleImageUpload(e.target.files[0]);
    };
    const handleImageUpload = async (file) => {
        setLoading(true);
        if (!file)
            return;
        // Form creation
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'fsgqertv');
        // Sending the form to Cloudinary
        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/dxeejm8ef/image/upload`, formData);
            setUploadedImage(res.data.url);
            setUploaded(true);
            setLoading(false);
        }
        catch (err) {
            console.error('Error uploading image: ', err);
        }
    };
    //Form for creating an article
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            userId: currentUser.id,
            title,
            content,
            imageUrl: uploadedImage,
        };
        axios
            .post(`${import.meta.env.VITE_BASE_URL}/api/community/articles`, data)
            .then(() => {
            loadAllArticles();
            handleShowCreate();
        })
            .catch((error) => {
            console.log(error);
        });
        setTitle('');
        setContent('');
        setSelectedImage(null);
        setUploadedImage('');
        setUploaded(false);
    };
    // Text editor handling
    const handleContentChange = (newContent) => {
        setContent(newContent);
    };
    return (_jsx("div", { className: 'fade-in-2 ', children: _jsxs("form", { onSubmit: handleSubmit, className: 'mx-auto max-w-5xl space-y-4 ', children: [_jsxs("div", { className: 'pt-20 ', children: [_jsx("label", { htmlFor: 'title', className: 'mb-2 block text-center text-lg font-medium text-gray-800 dark:text-gray-200', children: "Title" }), _jsx("input", { type: 'text', id: 'title', value: title, onChange: (e) => setTitle(e.target.value), className: ' mx-auto mt-1 block w-2/3 rounded-md border-gray-300 px-3 py-2 outline-none  ring-sky-400 transition-all  duration-150 focus:ring-2 hover:shadow dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-1 ', required: true })] }), _jsx("label", { className: 'mb-2 block text-center text-lg font-medium text-gray-800 dark:text-gray-200', children: "Image (optional)" }), _jsx("div", { className: 'flex justify-center ', children: uploaded ? (_jsx("img", { src: uploadedImage && uploadedImage, alt: 'Uploaded thumbnail', className: 'h-24 w-24 rounded  object-cover' })) : loading ? (_jsx("div", { className: 'mt-5 flex justify-center text-center text-sky-400 ', children: _jsx(FadeLoader, { color: '#00a8e8', loading: loading, css: override, size: 50 }) })) : (_jsxs(_Fragment, { children: [' ', _jsx("input", { className: 'cursor-pointer bg-white dark:bg-gray-700 dark:text-gray-200 ', type: 'file', onChange: handleImageChange })] })) }), _jsxs("div", { children: [_jsx("label", { htmlFor: 'content', className: 'mb-2 block text-center text-lg font-medium text-gray-800 dark:text-gray-200', children: "Content" }), _jsx(Editor, { prevContent: '', onContentChange: handleContentChange })] }), _jsxs("div", { className: 'flex justify-center space-x-2', children: [_jsx("button", { type: 'submit', className: ' w-40  rounded-md bg-sky-400 px-4 py-1 font-medium text-white transition-all duration-150 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-600', children: "Create Article" }), _jsx("button", { onClick: handleShowCreate, type: 'submit', className: ' w-40  rounded-md bg-gray-400 px-4 py-1 font-medium text-white transition-all duration-150 hover:bg-gray-500', children: "Cancel" })] })] }) }));
};
export default CreateArticle;
