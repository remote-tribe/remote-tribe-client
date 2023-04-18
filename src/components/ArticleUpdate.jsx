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
					<Link to={''}>
						<img
							src='user-avatar.jpg'
							alt='User Avatar'
							className='w-12 h-12 rounded-full'
						/>
					</Link>
					{/* <div>
						<p className='text-sm text-gray-600 mr-4'>
							{article.author ? `From ${article.author.username}` : 'From Unknown author'}
						</p>
						<p className='text-sm text-gray-500'>{new Date(article.createdAt).toLocaleDateString()}</p>
					</div> */}
				</div>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 text-center'>
					<div>
						<label
							htmlFor='title'
							className='block text-md font-medium text-gray-700'>
							Title
						</label>
						<input
							type='text'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md text-center cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='content'
							className='block text-md font-medium text-gray-700'>
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
							className='block text-md font-medium text-gray-700'>
							Image URL
						</label>
						<input
							type='text'
							id='imageUrl'
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							className='mt-1 block w-full p-2 border border-gray-300 rounded-md text-center cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150'
						/>
					</div>
					<div className='flex space-x-4 justify-center'>
						<button
							type='submit'
							className='w-1/5 p-1 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500 transition-all duration-150 hover:shadow-md'>
							Update Article
						</button>
						<button
							type='button'
							onClick={deleteArticle}
							className='w-1/5 p-1 bg-rose-400 text-white font-medium rounded-md hover:bg-rose-500 transition-all duration-150 hover:shadow-md'>
							Delete
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdateArticle
