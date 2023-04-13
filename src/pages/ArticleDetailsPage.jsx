import React from 'react';
import ArticleList from './components/ArticleList';
import CreateArticle from './components/CreateArticle';

const articles = [
    // Add your articles here
];

function App() {
    const handleCreateArticle = (newArticle) => {
        // Handle article creation logic here
        console.log('New article:', newArticle);
    };

    return (
        <div className="container mx-auto p-4 space-y-8">
            <CreateArticle onSubmit={handleCreateArticle} />
            <ArticleList articles={articles} />
        </div>
    );
}

export default App;
