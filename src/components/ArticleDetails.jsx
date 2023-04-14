import axios from 'axios'
import { useState, useContext } from 'react'
import { GetCurrentUser } from '../Auth'
import { UserContext } from '../context/UserContext'
import { useParams, Link } from 'react-router-dom'

export const ArticleDetails = ({ article }) => {
    const [commentValue, setCommentValue] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [editedComment, setEditedComment] = useState(article?.comment?.content)
    const currentUser = GetCurrentUser()
    const { handleLogout } = useContext(UserContext)
    const { articleId } = useParams()

    const [isLiked, setIsLiked] = useState(false);

    function handleLike() {
        setIsLiked((prevIsLiked) => !prevIsLiked);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        try {
            const response = await axios.post(
                'http://localhost:5005/api/comment',
                {
                    commentValue,
                    articleId,
                    userId: currentUser.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            console.log(response.data)
        } catch (error) {
            if (error.message.includes('401')) {
                handleLogout()
            }
            console.log(error)
        }
    }

    const handleEdit = async (commentId) => {
        setEditMode(true)
        setEditedComment(article?.comments.find((c) => c._id === commentId).content)
    }

    const handleDelete = async (e, commentId) => {
        e.preventDefault()
        setEditMode(false)
        const token = localStorage.getItem('token')

        try {
            const response = await axios.delete(
                `http://localhost:5005/api/comment?commentId=${commentId}&articleId=${articleId}&userId=${currentUser.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            console.log(response.data)
        } catch (error) {
            if (error.message.includes('401')) {
            }
            console.log(error)
        }
    }

    const handleSave = async (e, commentId) => {
        e.preventDefault()
        setEditMode(false)
        const token = localStorage.getItem('token')

        try {
            const response = await axios.put(
                `http://localhost:5005/api/comment`,
                {
                    editedComment,
                    commentId,
                    articleId,
                    userId: currentUser.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            console.log(response.data)
        } catch (error) {
            if (error.message.includes('401')) {
                handleLogout()
            }
            console.log(error)
        }
    }

    return (
        <div className='space-y-4'>
            <div className="max-w-screen-lg mx-auto  p-4 space-y-4">
                <div key={article._id} className="border bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
                    <div className="flex items-center">
                        <img
                            src={article.author ? article.author.profilePicture : ''}
                            alt="author-avatar"
                            className="w-10 h-10 rounded-full mr-4"
                        />
                        <p className="text-sm text-gray-600 mr-4">
                            {article.author ? `From ${article.author.username}` : 'From Unknown author'}
                        </p>
                        <p className="text-sm text-gray-500">
                            {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <p className="text-gray-800 mt-2">{article.content}</p>
                    {article.image && (
                        <img
                            src={article.image}
                            alt="article"
                            className="mt-4 rounded-lg w-full h-auto"
                        />
                    )}
                    <div className="flex items-center mt-2">
                        <p className="text-sm text-gray-600 mr-4">
                            {article.likes} {article.likes === 1 ? 'like' : 'likes'}
                        </p>
                        <button
                            className={`w-24 p-2 border rounded-md mr-4 ${isLiked ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500'
                                }`}
                            onClick={handleLike}
                        >
                            {isLiked ? 'Liked' : 'Like'}
                        </button>
                        <button className="w-24 p-2 border rounded-md border-blue-500 text-blue-500">
                            <Link to={`/community/article/${article._id}/edit`}>Edit</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-center text-3xl text-sky-500 mb-10'>Comments:</h1>
                <hr />
                {article.comments?.map((comment, index) => (
                    <div
                        key={index}
                        className='flex justify-between border-b-2'>
                        <p className='text-sky-400 cursor-pointer'>{comment.author.username}</p>
                        <form onSubmit={(e) => handleSave(e, comment?._id)}>
                            {editMode ? (
                                <input
                                    value={comment.content}
                                    onChange={(e) => {
                                        setEditedComment(e.target.value)
                                        comment.content = e.target.value
                                    }}
                                />
                            ) : (
                                <p>{comment.content}</p>
                            )}
                        </form>
                        <div className='space-x-5'>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={(e) => handleDelete(e, comment?._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ArticleDetails;
