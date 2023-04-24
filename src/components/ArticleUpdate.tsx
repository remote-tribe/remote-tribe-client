import axios from 'axios'
import { Editor } from './Editor'
import { GetCurrentUser } from '../Auth'
import { FadeLoader } from 'react-spinners'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

interface Article {
	_id: string
	title: string
	author: { username: string; profilePicture: string; _id: string }
	imageUrl?: string
	createdAt: string
	likes: number
	comments: object[]
}

const UpdateArticle = ({ article }: { article: Article }) => {
	const navigate = useNavigate()
	const { articleId } = useParams()
	const currentUser = GetCurrentUser() as { username: string; id: string }
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [loading, setLoading] = useState(false)
	const [selectedImage, setSelectedImage] = useState('')

	const PLACEHOLDER_IMAGE =
		'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/community/article/${articleId}`)
			.then((response) => {
				const article = response.data

				setTitle(article.title)
				setContent(article.content)
				setImageUrl(article.imageUrl)
			})
			.catch((error) => console.log(error))
	}, [articleId])

	const handleImageChange = (e: any) => {
		setSelectedImage(e.target.files[0])
		handleImageUpload(e.target.files[0])
	}

	const handleImageUpload = async (file: File) => {
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

	const handleSubmit = (e: any) => {
		e.preventDefault()
		const data = {
			author: currentUser.id,
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

	//Text editor handling
	const handleContentChange = (newContent: any) => {
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
									src={imageUrl || PLACEHOLDER_IMAGE}
									className='mx-auto h-24 w-24 rounded object-cover'
								/>
							)}
						</div>
					</div>
					<div className='flex flex-col items-center justify-center   md:flex-row'>
						<button
							type='submit'
							className=' mt-5 w-32 rounded-md bg-sky-400 p-1 font-medium text-white transition-all duration-150 hover:bg-sky-500 hover:shadow-md dark:bg-sky-500 dark:hover:bg-sky-600 md:mx-2 md:mt-5 '>
							Update Article
						</button>
						<button
							type='button'
							onClick={() => navigate(`/community/article/${article?._id}`)}
							className='mb-10 mt-2 w-32 rounded-md bg-gray-400 p-1 font-medium text-white transition-all duration-150 hover:bg-gray-500 hover:shadow-md md:mx-2 md:mb-0 md:mt-5'>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default UpdateArticle
