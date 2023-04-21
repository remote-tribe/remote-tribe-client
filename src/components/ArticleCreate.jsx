import axios from 'axios'
import React, { useState } from 'react'
import { GetCurrentUser } from '../Auth'
import { Editor } from './Editor'
import { Image } from 'cloudinary-react'
import { FadeLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}
const CreateArticle = ({ handleShowCreate, loadAllArticles }) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const currentUser = GetCurrentUser()
	const [loading, setLoading] = useState(false)

	// set upload images
	const [selectedImage, setSelectedImage] = useState(null)
	const [uploadedImage, setUploadedImage] = useState('')
	const [uploaded, setUploaded] = useState(false)

	//START!! handle images
	const handleImageChange = (e) => {
		setSelectedImage(e.target.files[0])
		handleImageUpload(e.target.files[0])
	}

	const handleImageUpload = async (file) => {
		setLoading(true)
		if (!file) return

		// create a FormData
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'fsgqertv')

		// sent POST request to Cloudinary
		try {
			const res = await axios.post(`https://api.cloudinary.com/v1_1/dxeejm8ef/image/upload`, formData)
			setUploadedImage(res.data.url)
			setUploaded(true)
			setLoading(false)
		} catch (err) {
			console.error('Error uploading image: ', err)
		}
	}

	//END!! handle images

	const handleContentChange = (newContent) => {
		setContent(newContent)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = {
			userId: currentUser.id,
			title,
			content,

			imageUrl: uploadedImage,
		}

		axios
			.post(`${import.meta.env.VITE_BASE_URL}/api/community/articles`, data)
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
		setSelectedImage(null)
		setUploadedImage('')
		setUploaded(false)
	}

	return (
		<div className='fade-in-2'>
			<form
				onSubmit={handleSubmit}
				className='mx-auto max-w-5xl space-y-4 '>
				<div className='mt-20'>
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
						className=' outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mt-1 block mx-auto  px-3 py-2  border-gray-300 dark:text-black dark:bg-gray-300 rounded-md w-2/3'
						required
					/>
				</div>
				<label
					htmlFor='title'
					className='block text-center text-lg mb-2 font-medium text-gray-800 dark:text-gray-200'>
					Image
				</label>
				<div className='flex justify-center'>
					{uploaded ? (
						<img
							src={uploadedImage && uploadedImage}
							alt='Uploaded thumbnail'
							className='w-24 h-24 object-cover  rounded'
						/>
					) : loading ? (
						<div className='text-center text-sky-400 flex justify-center mt-5 '>
							<FadeLoader
								color={'#00a8e8'}
								loading={loading}
								css={override}
								size={50}
							/>
						</div>
					) : (
						<>
							{' '}
							<input
								className='bg-white dark:bg-gray-300 '
								type='file'
								onChange={handleImageChange}
							/>
						</>
					)}
				</div>

				<div>
					<label
						htmlFor='content'
						className='block text-center text-lg mb-2 font-medium text-gray-800 dark:text-gray-200'>
						Content
					</label>
					<Editor onContentChange={handleContentChange} />
				</div>
				<div className='flex justify-center space-x-2'>
					<button
						type='submit'
						className=' w-40  px-4 py-1 bg-sky-400 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-medium rounded-md hover:bg-sky-500 transition-all duration-150'>
						Create Article
					</button>
					<button
						onClick={handleShowCreate}
						type='submit'
						className=' w-40  px-4 py-1 bg-gray-400 text-white font-medium rounded-md hover:bg-gray-500 transition-all duration-150'>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateArticle
