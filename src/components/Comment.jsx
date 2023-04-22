import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Comment = ({ comment, articleId, currentUser, handleLogout }) => {
	const [editMode, setEditMode] = useState(false)
	const [editedComment, setEditedComment] = useState(comment.content)

	const handleEdit = () => {
		setEditMode(true)
		setEditedComment(comment?.content)
	}

	const handleDelete = async (e) => {
		e.preventDefault()
		setEditMode(false)
		const token = localStorage.getItem('token')

		try {
			const response = await axios.delete(
				`${import.meta.env.VITE_BASE_URL}/api/comment?commentId=${
					comment?._id
				}&articleId=${articleId}&userId=${currentUser?.id}`,
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

	const handleSave = async (e) => {
		e.preventDefault()
		setEditMode(false)
		const token = localStorage.getItem('token')

		try {
			const response = await axios.put(
				`${import.meta.env.VITE_BASE_URL}/api/comment`,
				{
					editedComment,
					commentId: comment?._id,
					articleId,
					userId: currentUser?.id,
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
		<div className='flex justify-between border-b-2'>
			<Link
				to={``}
				className='cursor-pointer text-sky-400'>
				{comment?.author.username}
			</Link>
			<form onSubmit={handleSave}>
				{editMode ? (
					<input
						value={editedComment}
						onChange={(e) => setEditedComment(e.target.value)}
					/>
				) : (
					<p>{comment?.content}</p>
				)}
			</form>
			<div className='space-x-5'>
				<button onClick={handleEdit}>Edit</button>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	)
}

export default Comment
