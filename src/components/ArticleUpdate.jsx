import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { GetCurrentUser } from '../Auth'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Editor } from './Editor'
import { Image } from 'cloudinary-react'
import { FadeLoader } from 'react-spinners'
const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}
const UpdateArticle = ({ article }) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const navigate = useNavigate()
	const currentUser = GetCurrentUser()
	const [loading, setLoading] = useState(false)
	const [selectedImage, setSelectedImage] = useState(null)
	const { articleId } = useParams()
	const DEFAULT_IMAGE_URL =
		'http://res.cloudinary.com/dxeejm8ef/image/upload/v1681998829/aldc1ngkd91yif7ddeje.png'
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

	const handleImageChange = (e) => {
		setSelectedImage(e.target.files[0])
		handleImageUpload(e.target.files[0])
	}

	const handleImageUpload = async (file) => {
		setLoading(true)
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'fsgqertv')

		try {
			const res = await axios.post(`https://api.cloudinary.com/v1_1/dxeejm8ef/image/upload`, formData)
			setImageUrl(res.data.url)
			setLoading(false)
		} catch (err) {
			console.error('Error uploading image: ', err)
		}
	}

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
		setSelectedImage('')
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
		<div className='mx-auto max-w-screen-md fade-in-2'>
			<div className='space-y-4'>
				<div className='flex justify-center-center mx-auto'>
					<Link
						className='flex justify-center mx-auto'
						to={`/users/${article?.author?._id}`}>
						<img
							src={article?.author?.profilePicture}
							alt='User Avatar'
							className='w-12 h-12 rounded-full mx-auto'
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
							Image
						</label>
						<input
							id='fileInput'
							type='file'
							onChange={handleImageChange}
							className='w-2/5 p-1 text-black font-medium rounded-md transition-all dark:text-white duration-150 hover:shadow-md'
						/>

						<div className='mt-4'>
							{loading ? (
								<div className='text-center text-sky-400 flex justify-center mt-5 '>
									<FadeLoader
										color={'#00a8e8'}
										loading={loading}
										css={override}
										size={50}
									/>
								</div>
							) : (
								<img
									src={imageUrl || DEFAULT_IMAGE_URL}
									className='w-24 h-24 object-cover rounded mx-auto'
								/>
							)}
						</div>
					</div>
					<div className='flex space-x-4  justify-center'>
						<button
							type='submit'
							className='w-1/5 p-1 bg-sky-400 dark:bg-sky-500 text-white font-medium rounded-md hover:bg-sky-500 dark:hover:bg-sky-600 transition-all duration-150 hover:shadow-md mb-10 mt-5'>
							Update Article
						</button>
						<button
							type='button'
							onClick={() => navigate(`/community/article/${article?._id}`)}
							className='w-1/5 p-1 bg-gray-400 text-white font-medium rounded-md hover:bg-gray-500 transition-all duration-150 hover:shadow-md mb-10 mt-5'>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdateArticle
