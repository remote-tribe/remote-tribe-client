import axios from 'axios'
import React, { useState } from 'react'
import { GetCurrentUser } from '../Auth'

const CreateArticle = ({ handleShowCreate, loadAllArticles }) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const currentUser = GetCurrentUser()

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = {
			userId: currentUser.id,
			title: title,
			content: content,
			imageUrl: imageUrl,
		}

		axios
			.post(`http://localhost:5005/api/community/articles`, data)
			.then((response) => {
				console.log(response.data)
				loadAllArticles()
				handleShowCreate()
			})
			.catch((error) => {
				console.log(error)
			})

		setTitle('')
		setContent('')
		setImageUrl('')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='mx-auto max-w-lg space-y-4 '>
			<div>
				<label
					htmlFor='title'
					className='block text-center text-sm font-medium text-gray-800 dark:text-gray-200'>
					Title
				</label>
				<input
					type='text'
					id='title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className='cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mt-1 block w-full px-3 py-2 border border-gray-300 dark:text-sky-200 dark:bg-gray-700 rounded-md'
					required
				/>
			</div>
			<div>
				<label
					htmlFor='content'
					className='block text-center text-sm font-medium text-gray-800 dark:text-gray-200'>
					Content
				</label>
				<textarea
					id='content'
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className=' cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:text-sky-200 dark:bg-gray-700 '
					rows='4'
					required
				/>
			</div>
			<div>
				<label
					htmlFor='imageUrl'
					className='block text-sm text-center font-medium text-gray-700 dark:text-gray-200'>
					Image URL
				</label>
				<input
					type='file'
					id='imageUrl'
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					className='mt-1  block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200'
				/>
			</div>
			<div className='flex justify-center'>
				<button
					type='submit'
					className=' w-1/3  px-4 py-1 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500'>
					Create Article
				</button>
			</div>
		</form>
	)
}

export default CreateArticle
