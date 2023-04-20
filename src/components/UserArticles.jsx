import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserArticles = ({ currentUser, handleShowArticlesSettings }) => {
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getAllArticles()
    }, [])

    const getAllArticles = () => {
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/api/users/${currentUser.id}/articles`)
            .then(({ data }) => {
                setArticles(data.article.reverse())
            })
            .catch((e) => {
                console.log('fail to access database..', e)
            })
    }


    return (
        <div className='mx-auto'>
            {articles && (
                <div className='flex flex-wrap mx-auto my-6 justify-center space-x-12 w-10/12'>
                    {articles?.map((article, index) => (
                        <Link
                            to={`/community/article/${article?._id}`}
                            key={index}
                            className='w-96 h-96 flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all duration-150 bg-white dark:bg-gray-700 dark:text-gray-50 mb-16'>
                            {article?.imageUrl ? (
                                <img
                                    className='w-full h-64 object-cover object-center'
                                    src={article?.imageUrl}
                                    alt={article?.title}
                                />
                            ) : (
                                <div className='w-full h-64 object-cover object-center bg-sky-800'></div>
                            )}

                            <div className='px-4 py-4 flex justify-between'>
                                <div className='font-semibold text-2xl mb-2'>{article?.title}</div>
                                <span className=' px-2 py-2 text-sm font-semibold text-gray-700'>07/02/2023</span>
                            </div>
                            <div className='flex justify-between mt-auto'>
                                <Link
                                    to={`/users/${article?.author?._id}`}
                                    className=' flex justify-between mt-auto mb-2 px-4 rounded-full py-1 text-lg font-semibold text-sky-400 mr-2 hover:text-sky-500 transition-all duration-150'>
                                    {article?.author.username}
                                </Link>
                                <div className='space-x-4 text-lg mr-4 mt-1'>
                                    <span className='space-x-1 text-gray-600'>
                                        <i className='fa-solid fa-thumbs-up text-sky-400 mx-1' />
                                        {article?.likes}
                                    </span>
                                    <span className='space-x-1  text-gray-600'>
                                        <i className='fa-solid fa-comment text-sky-400 mx-1' />
                                        {article?.comments?.length}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <div className='flex flex-wrap mx-auto my-6 justify-center space-x-12 w-10/12'>
                        <button
                            onClick={handleShowArticlesSettings}
                            className=' font-normal text-sky-400 cursor-pointer'>
                            back
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default UserArticles
