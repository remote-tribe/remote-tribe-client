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
			<div>Article Details Page</div>
			<div
				key={article._id}
				className='border p-4 rounded-lg shadow-md'>
				<h2 className='text-xl font-bold'>{article.title}</h2>
				<p className='text-sm text-gray-600'>
					By {article.author ? article.author.username : 'Unknown author'}
				</p>
				<p className='overflow-hidden max-h-10 text-gray-800'>{article.content}</p>
				<p className='text-sm text-gray-500'>{new Date(article.createdAt).toLocaleDateString()}</p>
				<p className='text-sm text-gray-600'>{article.comments ? article.comments.length : 0} comments</p>
				<p className='text-sm text-gray-600'>{article.likes} likes</p>
				<button>
					<a href='/'>Go back</a>
				</button>
				<form onSubmit={handleSubmit}>
					<input
						onChange={(e) => setCommentValue(e.target.value)}
						value={commentValue}
						type='text'
						name='comment'
					/>

					<button>Submit</button>
				</form>
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

export default ArticleDetails
