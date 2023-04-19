import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { GetCurrentUser } from '../Auth'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Editor } from './Editor'

const UpdateArticle = ({ article }) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const navigate = useNavigate()
	const currentUser = GetCurrentUser()

	const { articleId } = useParams()

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/community/article/${articleId}`)
			.then((response) => {
				const oneArticle = response.data
				setTitle(oneArticle.title)
				setContent(oneArticle.content)
				setImageUrl(oneArticle.imageUrl)
			})
			.catch((error) => console.log(error))
	}, [articleId])

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = {
			author: currentUser._id,
			title: title,
			content: content,
			imageUrl: imageUrl,
		}

		axios
			.put(`${import.meta.env.VITE_BASE_URL}/api/community/article/${articleId}`, data)
			.then(() => {
				navigate(`/community/article/${articleId}`)
			})
			.catch((e) => {
				console.log(e)
			})

		setTitle('')
		setContent('')
		setImageUrl('')
	}

	const deleteArticle = () => {
		axios
			.delete(
				`${import.meta.env.VITE_BASE_URL}/api/community/article/${article._id}?articleId=${
					article?._id
				}&userId=${currentUser.id}&comments=${article?.comments}`,
			)
			.then(() => {
				navigate('/community')
			})
			.catch((err) => console.log(err))
	}

	const handleContentChange = (newContent) => {
		setContent(newContent)
	}

	return (
		<div className='mx-auto max-w-screen-md'>
			<div className='space-y-4'>
				<div className='flex items-center space-x-4'>
					<Link to={`/users/${article?.author?._id}`}>
						<img
							src={article?.author?.profilePicture}
							alt='User Avatar'
							className='w-12 h-12 rounded-full'
						/>
					</Link>
				</div>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 text-center'>
					<div>
						<label
							htmlFor='title'
							className='block text-center text-lg mb-2 font-medium text-gray-800 dark:text-gray-200'>
							Title
						</label>
						<input
							type='text'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md text-center cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 dark:text-white dark:bg-gray-700  dark:border-none'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='content'
							className='block text-center text-lg mb-2 font-medium text-gray-800 dark:text-gray-200'>
							Content
						</label>
						<Editor
							prevContent={content}
							onContentChange={handleContentChange}
						/>
					</div>
					<div>
						<label
							htmlFor='imageUrl'
							className='block text-center text-lg mb-2 font-medium text-gray-800 dark:text-gray-200'>
							Image URL
						</label>
						<input
							type='text'
							id='imageUrl'
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md text-center cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 dark:text-white dark:bg-gray-700  dark:border-none '
						/>
					</div>
					<div className='flex space-x-4 justify-center'>
						<button
							type='submit'
							className='w-1/5 p-1 bg-sky-400 dark:bg-sky-500 text-white font-medium rounded-md hover:bg-sky-500 dark:hover:bg-sky-600 transition-all duration-150 hover:shadow-md'>
							Update Article
						</button>
						<button
							type='button'
							onClick={() => navigate(`/community/article/${article?._id}`)}
							className='w-1/5 p-1 bg-gray-400 text-white font-medium rounded-md hover:bg-gray-500 transition-all duration-150 hover:shadow-md'>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdateArticle
