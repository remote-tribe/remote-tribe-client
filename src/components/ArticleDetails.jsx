import { useState } from 'react';

const ArticleList = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    return (
        <div className="space-y-4">
            {props.articles && props.articles.map((article, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold">{article.title}</h2>
                    <p className="text-sm text-gray-600">By {article.author}</p>
                    <p className="overflow-hidden max-h-[0.75rem] text-gray-800">
                        {article.content}
                    </p>
                    <p className="text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">{article.likes} likes</p>
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
