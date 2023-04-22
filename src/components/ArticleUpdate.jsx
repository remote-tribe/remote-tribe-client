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
		<div className='fade-in-2 mx-auto max-w-screen-md'>
			<div className='space-y-4'>
				<div className='justify-center-center mx-auto flex'>
					<Link
						className='mx-auto flex justify-center'
						to={`/users/${article?.author?._id}`}>
						<img
							src={article?.author?.profilePicture}
							alt='User Avatar'
							className='mx-auto h-12 w-12 rounded-full'
						/>
					</Link>
				</div>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 text-center'>
					<div>
						<label
							htmlFor='title'
							className='mb-2 block text-center text-lg font-medium text-gray-800 dark:text-gray-200'>
							Title
						</label>
						<input
							type='text'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='mt-1 block w-full cursor-pointer rounded-md border border-gray-300 p-2 text-center outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:ring-2 hover:shadow dark:border-none dark:bg-gray-700  dark:text-white'
							required
						/>
					</div>
					<div>
						<label
							htmlFor='content'
							className='mb-2 block text-center text-lg font-medium text-gray-800 dark:text-gray-200'>
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
							className='mb-2 block text-center text-lg font-medium text-gray-800 dark:text-gray-200'>
							Image
						</label>
						<input
							id='fileInput'
							type='file'
							onChange={handleImageChange}
							className='w-2/5 rounded-md p-1 font-medium text-black transition-all duration-150 hover:shadow-md dark:text-white'
						/>

						<div className='mt-4'>
							{loading ? (
								<div className='mt-5 flex justify-center text-center text-sky-400 '>
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
									className='mx-auto h-24 w-24 rounded object-cover'
								/>
							)}
						</div>
					</div>
					<div className='flex justify-center  space-x-4'>
						<button
							type='submit'
							className='mb-10 mt-5 w-1/5 rounded-md bg-sky-400 p-1 font-medium text-white transition-all duration-150 hover:bg-sky-500 hover:shadow-md dark:bg-sky-500 dark:hover:bg-sky-600'>
							Update Article
						</button>
						<button
							type='button'
							onClick={() => navigate(`/community/article/${article?._id}`)}
							className='mb-10 mt-5 w-1/5 rounded-md bg-gray-400 p-1 font-medium text-white transition-all duration-150 hover:bg-gray-500 hover:shadow-md'>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdateArticle
