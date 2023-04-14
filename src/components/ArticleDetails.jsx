import axios from 'axios'
import { useState, useContext } from 'react'
import { GetCurrentUser } from '../Auth'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'

const ArticleDetails = ({ article }) => {
	const [commentValue, setCommentValue] = useState('')
	const currentUser = GetCurrentUser()
	const { handleLogout } = useContext(UserContext)
	const { articleId } = useParams()

	const handleSubmit = async (event) => {
		event.preventDefault()
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
		</div>
	)
}

export default ArticleDetails
