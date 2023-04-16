import axios from 'axios'
import { useState, useContext } from 'react'
import { GetCurrentUser } from '../Auth'
import { UserContext } from '../context/UserContext'
import { useParams, Link } from 'react-router-dom'
import Comment from './Comment'

export const ArticleDetails = ({ article }) => {
	const [commentValue, setCommentValue] = useState('')
	const currentUser = GetCurrentUser()
	const { handleLogout } = useContext(UserContext)
	const { articleId } = useParams()
	const [isLiked, setIsLiked] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const closeDropdown = () => {
		if (isOpen) setIsOpen(false)
	}

	const handleEditClick = () => {
		// Code to handle edit functionality
	}

	const handleDeleteClick = () => {
		// Code to handle delete functionality
	}

	function handleLike() {
		setIsLiked((prevIsLiked) => !prevIsLiked)
	}
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

	return (
		<div
			className='space-y-4'
			onClick={closeDropdown}>
			<div className='max-w-screen-lg mx-auto  p-4 space-y-4'>
				<div
					key={article._id}
					className='border bg-white rounded-lg shadow-md py-2 px-4'>
					<div
						style={{ left: '99%' }}
						className='relative  '>
						<span
							className='text-gray-400  cursor-pointer hover:text-gray-500 focus:outline-none focus:text-gray-500 p-2'
							onClick={toggleDropdown}>
							<i className='fa-solid fa-ellipsis-vertical scale-125'></i>
						</span>

						{isOpen && (
							<div className='absolute z-10 -left-44  mt-2 w-48 bg-white rounded-md shadow-lg'>
								<div
									className=' '
									role='menu'
									aria-orientation='vertical'
									aria-labelledby='options-menu'>
									<Link
										to={`/community/article/${article._id}/edit`}
										className='block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-center'
										onClick={handleEditClick}
										role='menuitem'>
										Edit
									</Link>
									<button
										className='block px-4 py-2 text-md text-rose-400 hover:bg-gray-100 w-full'
										onClick={handleDeleteClick}
										role='menuitem'>
										Delete
									</button>
								</div>
							</div>
						)}
					</div>
					<h2 className='text-2xl font-bold mb-4'>{article.title}</h2>
					<div className='flex items-center'>
						<img
							src={article.author ? article.author.profilePicture : ''}
							alt='author-avatar'
							className='w-10 h-10 rounded-full mr-4'
						/>
						<p className='text-sm text-gray-600 mr-4'>
							{article.author ? `From ${article.author.username}` : 'From Unknown author'}
						</p>
						<p className='text-sm text-gray-500'>{new Date(article.createdAt).toLocaleDateString()}</p>
					</div>
					<div
						dangerouslySetInnerHTML={{
							__html: `<div className='text-gray-800 mt-2'>${article.content}</div>`,
						}}
					/>

					{article.image && (
						<img
							src={article.image}
							alt='article'
							className='mt-4 rounded-lg w-full h-auto'
						/>
					)}
					<div className='flex items-center mt-2'>
						<button
							className={`inline-flex items-center scale-125  justify-center w-fit mx-4 transition-all duration-300 transform-gpu  ${
								isLiked ? 'text-rose-600' : 'text-gray-600 '
							}`}
							onClick={handleLike}>
							<i className='fa-solid fa-heart scale-150'></i>
						</button>

						<p className='text-sm text-gray-600 mr-4'>
							{article.likes} {article.likes === 1 ? 'like' : 'likes'}
						</p>

						{/* <button className='w-24 p-2 border rounded-md border-blue-500 text-blue-500'>
							<Link to={`/community/article/${article._id}/edit`}>Edit</Link>
						</button> */}
					</div>
				</div>
			</div>
			<div>
				<h1 className='text-center text-3xl text-sky-500 mb-10'>Comments:</h1>
				<hr />
				<form
					onSubmit={handleSubmit}
					className='flex justify-center items-center border-none outline-none ring-sky-500 focus-within:ring-1 w-5/12 rounded mx-auto mt-4'>
					<input
						className='outline-none text-lg w-full rounded-s border-none py-2 px-4  '
						placeholder='Leave a Comment'
						onChange={(e) => setCommentValue(e.target.value)}
						value={commentValue}
						type='text'
						name='comment'
					/>

					<button className='bg-sky-500 hover:bg-sky-600  text-white font-bold hover:shadow-md shadow  px-4 py-2 text-lg rounded-e ease-linear transition-all duration-150 w-fit h-fit'>
						Comment
					</button>
				</form>
				{article.comments?.map((comment, index) => (
					<Comment
						articleId={article?._id}
						currentUser={currentUser}
						comment={comment}
						handleLogout={handleLogout}
						key={index}
					/>
				))}
			</div>
		</div>
	)
}

export default ArticleDetails
