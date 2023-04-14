const ArticleDetails = ({ article }) => {
    return (
        <div className='space-y-4'>
            <div>Article Details Page</div>
            {
                <div
                    key={article._id}
                    className='border p-4 rounded-lg shadow-md'>
                    <h2 className='text-xl font-bold'>{article.title}</h2>
                    <p className='text-sm text-gray-600'>
                        By {article.author ? article.author.username : 'Unknown author'}
                    </p>
                    <p className='overflow-hidden max-h-[0.75rem] text-gray-800'>{article.content}</p>
                    <p className='text-sm text-gray-500'>{new Date(article.createdAt).toLocaleDateString()}</p>
                    <p className='text-sm text-gray-600'>{article.likes} likes</p>
                    <button>
                        <a href='/'></a>
                    </button>
                </div>
            }
        </div>
    )
}

export default ArticleDetails;
