import { Link } from 'react-router-dom'

const ArticleList = ({ articles, handleShowCreate }) => {
    return (
        <div className='mx-auto max-w-2xl '>
            <div className='flex justify-center my-5'>
                <button
                    className='w-1/3  px-4 py-1 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500'
                    onClick={handleShowCreate}>
                    Create an Article
                </button>
            </div>
            <div className='space-y-4'>
                {articles &&
                    articles.map((article, index) => (
                        <div key={index}>
                            <div
                                key={index}
                                className='border p-4 rounded-lg shadow-md bg-white space-y-4'>
                                <div className='flex justify-between'>
                                    <Link
                                        to={``}
                                        className='text-lg text-gray-600 hover:text-sky-400'>
                                        {article.author.username}
                                    </Link>
                                    <p className='text-sm text-gray-500'>{new Date(article.createdAt).toLocaleDateString()}</p>
                                </div>
                                <h2 className='text-xl font-semibold'>{article.title}</h2>

                                <p className='overflow-hidden  text-gray-800'>{article.content}</p>

                                <div className='flex justify-between'>
                                    <div className='flex space-x-3 mt-2'>
                                        <p className='text-sm text-gray-600 cursor-pointer hover:text-sky-400'>
                                            {article.likes} Likes
                                        </p>
                                        <p className='text-sm text-gray-600 cursor-pointer hover:text-sky-400'>
                                            {article.comments.length} Comments
                                        </p>
                                    </div>
                                    <button className='bg-sky-500 hover:bg-sky-600 text-white py-1 px-4 rounded-lg '>
                                        Like
                                    </button>
                                </div>
                            </div>

                            <input
                                type='text'
                                placeholder='Leave a Comment'
                                className='border rounded-lg px-2 py-1 w-full outline-sky-400'
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ArticleList
