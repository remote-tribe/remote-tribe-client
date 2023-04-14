import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { GetCurrentUser } from '../Auth';
import { useParams, useNavigate } from "react-router-dom";

const UpdateArticle = ({ article }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate()
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


    const deleteArticle = () => {

        axios
            .delete(`http://localhost:5005/api/community/article/${articleId}`)
            .then(() => {
                navigate("/community");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="mx-auto max-w-screen-lg">
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <img src="user-avatar.jpg" alt="User Avatar" className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="text-sm text-gray-600 mr-4">
                            {article.author ? `From ${article.author.username}` : 'From Unknown author'}
                        </p>
                        <p className="text-sm text-gray-500">
                            {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
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
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="w-full p-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-500"
                        >
                            Update Article
                        </button>
                        <button
                            type="button"
                            onClick={deleteArticle}
                            className="w-full p-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default UpdateArticle;
