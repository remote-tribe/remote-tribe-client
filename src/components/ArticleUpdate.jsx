import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetCurrentUser } from '../Auth';

const UpdateArticle = (props) => {

    const currentUser = GetCurrentUser();

    const handleSubmit = (e) => {
        e.preventDefault();

        const articleToBeCreated = {
            author: currentUser._id,
            title: title,
            content: content,
            imageUrl: imageUrl,
        };

        axios
            .post(`http://localhost:5005/api/community/articles`, articleToBeCreated)
            .then((e) => {
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
