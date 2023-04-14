import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { GetCurrentUser } from '../Auth';
import { useParams, useNavigate } from "react-router-dom";

const UpdateArticle = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const currentUser = GetCurrentUser();

    const { articleId } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5005/api/community/article/${articleId}`)
            .then((response) => {
                const oneArticle = response.data;
                setTitle(oneArticle.title);
                setContent(oneArticle.content);
                setImageUrl(oneArticle.imageUrl)
            })
            .catch((error) => console.log(error));

    }, [articleId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const articleToBeEdit = {
            author: currentUser._id,
            title: title,
            content: content,
            imageUrl: imageUrl,
        };

        axios
            .put(`http://localhost:5005/api/community/article/${articleId}`, articleToBeEdit)
            .then((e) => {
                navigate(`/community/article/${articleId}`)
            })
            .catch((e) => {
                console.log(e);
            });

        setTitle('');
        setContent('');
        setImageUrl('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    rows="4"
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                    Image URL
                </label>
                <input
                    type="file"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-500"
            >
                Create Article
            </button>
        </form>
    );
};

export default UpdateArticle;
