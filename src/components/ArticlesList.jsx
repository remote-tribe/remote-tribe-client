import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ArticleList = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getAllArticles();
    }, [])

    const getAllArticles = () => {
        axios
            .get("http://localhost:5005/api/community/articles")
            .then((arrFromDB) => { setArticles(arrFromDB) })
            .catch(e => { console.log("fail to access database.." + e) })
    }
    return (
        <div className="space-y-4">
            {articles.map((article, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold">{article.title}</h2>
                    <p className="text-sm text-gray-600">By {article.author}</p>
                    <p className="overflow-hidden max-h-[0.75rem] text-gray-800">
                        {article.content}
                    </p>
                    <p className="text-sm text-gray-500">
                        {new Date(article.createTime).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">{article.likes} likes</p>
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
