import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { GetCurrentUser } from '../Auth'
import { UserContext } from '../context/UserContext'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Comment from './Comment'
import { DeleteModal } from './DeleteModal'

export const ArticleDetails = ({ article, getArticle, setLoading }) => {
	const [commentValue, setCommentValue] = useState('')
	const currentUser = GetCurrentUser()
	const { handleLogout } = useContext(UserContext)
	const { articleId } = useParams()
	const token = localStorage.getItem('token')
	const navigate = useNavigate()
	const [modalOpen, setModalOpen] = useState(false)

	const [isLiked, setIsLiked] = useState(false)
	const initialLikesNum = parseInt(typeof article.likes === 'number' ? article.likes : 0)
	const [likesNum, setLikesNum] = useState(initialLikesNum)

	// set article date
	const [articleDate, setArticleDate] = useState('')

	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		setModalOpen(true)
	}

	const closeModal = () => {
		setModalOpen(false)
	}

	const handleDeleteClick = async () => {
		closeModal()
		setLoading(true)
		try {
			await axios.delete(
				`${import.meta.env.VITE_BASE_URL}/api/community/article/${articleId}?articleId=${articleId}&userId=${
					currentUser?.id
				}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			setLoading(false)
			navigate('/community')
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}
	// START!!! handle likes function
	useEffect(() => {
		if (typeof article.likes === 'number') {
			setLikesNum(article.likes)
		}
		if (article.likedBy && article.likedBy.includes(currentUser?.id)) {
			setIsLiked(true)
		} else {
			setIsLiked(false)
		}
	}, [article.likes, article.likedBy, currentUser?.id])

	async function addLikesNumInDataBase() {
		await axios.post(`${import.meta.env.VITE_BASE_URL}/api/community/article/${article._id}/like`, {
			userId: currentUser.id,
		})
	}

	async function addDislikesNumInDataBase() {
		await axios.put(`${import.meta.env.VITE_BASE_URL}/api/community/article/${article._id}/like`, {
			userId: currentUser.id,
		})
	}

	async function handleLike() {
		if (token) {
			if (isLiked === false) {
				await addLikesNumInDataBase()
				const addedNum = likesNum + 1
				setLikesNum(addedNum)
				setIsLiked((prevIsLiked) => !prevIsLiked)
			} else {
				await addDislikesNumInDataBase()
				const addedNum = likesNum - 1
				setLikesNum(addedNum)
				setIsLiked((prevIsLiked) => !prevIsLiked)
			}
		} else navigate('/signin')
	}
	// END!!! handle likes function

	//START handle article date function
	useEffect(() => {
		const date = new Date(article.createdAt)
		const formattedDate = date.toLocaleString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})
		setArticleDate(formattedDate)
	}, [article])
	// END!!! article data function

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (token) {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BASE_URL}/api/comment`,
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

				getArticle()
			} catch (error) {
				if (error.message.includes('401')) {
					handleLogout()
				}
				console.log(error)
			}
		} else navigate('/signin')
	}

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const closeDropdown = () => {
		if (isOpen) setIsOpen(false)
	}

	return (
		article && (
			<div onClick={closeDropdown}>
				<main className='fade-in-2 pb-16 pt-8 lg:pb-24 lg:pt-16 '>
					<div className='mx-auto flex max-w-screen-xl justify-between px-4 '>
						<article className='format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl'>
							<header className='not-format mb-4 lg:mb-6'>
								<address className='mb-6 flex items-center justify-between not-italic'>
									<div className='mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white'>
										<Link
											to={`/users/${article?.author?._id}`}
											rel='author'
											className='text-xl font-semibold text-sky-500 '>
											<img
												className='mr-4 h-16 w-16 rounded-full object-cover object-center'
												src={article?.author?.profilePicture}
												alt={article?.author?.username}
											/>
										</Link>

										<div>
											<Link
												to={`/users/${article?.author?._id}`}
												rel='author'
												className='text-xl font-semibold text-sky-500 dark:text-sky-400'>
												{article?.author?.username}
											</Link>
											<p className='text-base font-light text-gray-600 dark:text-gray-200 '>
												{article?.author?.profession}
											</p>
											<p className='text-base font-light text-gray-600 dark:text-gray-400 '>
												<time
													dateTime={articleDate}
													title={articleDate}>
													{articleDate}
												</time>
											</p>
										</div>
									</div>
									<div className='relative inline-block text-left'>
										<button
											type='button'
											onClick={toggleDropdown}
											className='inline-flex w-full justify-center rounded-full    px-4 py-2 text-sm font-medium text-gray-400 transition-all duration-150 focus:outline-none hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-gray-700'
											id='options-menu'
											aria-haspopup='true'
											aria-expanded='true'>
											<i className='fa-solid fa-ellipsis-vertical text-2xl'></i>
										</button>
										<div>
											{/* Dropdown menu */}
											{isOpen && (
												<div className='absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1  ring-black ring-opacity-5 focus:outline-none dark:bg-gray-600'>
													<div
														className=''
														role='menu'
														aria-orientation='vertical'
														aria-labelledby='options-menu'>
														{article?.author?._id === currentUser?.id ? (
															<>
																<Link
																	to={`/community/article/${article?._id}/edit`}
																	className='text-md block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700'>
																	Edit
																</Link>
																<Link
																	onClick={openModal}
																	className=' text-md block  px-4 py-3 text-red-500 hover:bg-gray-100 hover:text-gray-900 dark:text-red-400 dark:hover:bg-gray-700'
																	role='menuitem'>
																	Delete
																</Link>
															</>
														) : (
															<Link
																className='text-md block px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 '
																role='menuitem'>
																Report
															</Link>
														)}
													</div>
												</div>
											)}

											{/* Conditionally render the modal */}
											<DeleteModal
												isOpen={modalOpen}
												closeModal={closeModal}
												handleDeleteClick={handleDeleteClick}
											/>
										</div>
									</div>
								</address>
								<h1 className='mb-4 text-3xl font-semibold leading-tight text-gray-900 dark:text-white lg:mb-6 lg:text-4xl'>
									{article?.title}
								</h1>
							</header>

							<figure>
								<img
									src={article.imageUrl}
									alt=''
								/>
							</figure>

							<div
								className='prose my-10 dark:text-gray-200 dark:prose-headings:text-gray-200 '
								dangerouslySetInnerHTML={{ __html: article?.content }}
							/>
							<div className='my-4 flex items-center text-4xl'>
								<button
									className={`mx-4 inline-flex   w-fit transform-gpu items-center justify-center transition-all duration-300  ${
										isLiked ? 'text-sky-400 dark:text-sky-300' : 'text-slate-400 dark:text-slate-200 '
									}`}
									onClick={handleLike}>
									<i className='fa-solid fa-thumbs-up  '></i>
								</button>

								<p className=' mr-4 text-3xl text-gray-600 dark:text-white'>{likesNum}</p>
							</div>
							<section className='not-format'>
								<div className='mb-6 flex items-center justify-between'>
									<h2 className='text-lg font-bold text-gray-900 dark:text-white lg:text-2xl'>
										Discussion ({article?.comments?.length})
									</h2>
								</div>
								<form
									className='mb-6'
									onSubmit={handleSubmit}>
									<div className='mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 ring-sky-400 transition-all duration-150 focus-within:ring-2 dark:border-gray-700 dark:bg-gray-700'>
										<label
											htmlFor='comment'
											className='sr-only'>
											Your comment
										</label>
										<textarea
											id='comment'
											rows='6'
											onChange={(e) => setCommentValue(e.target.value)}
											value={commentValue}
											className='w-full resize-none border-0 px-0 text-sm  text-gray-900 outline-none dark:bg-gray-700  dark:text-gray-200 dark:placeholder-gray-300 '
											placeholder='Write a comment...'
										/>
									</div>
									<button
										type='submit'
										className='w-1/5 rounded-md bg-sky-400 p-1 font-medium text-white transition-all duration-150 hover:bg-sky-500 hover:shadow-md dark:bg-sky-500 dark:hover:bg-sky-600'>
										Post Comment
									</button>
								</form>
								{article?.comments?.map((comment, index) => (
									<article
										key={index}
										className='mb-6 rounded-lg bg-white p-6 text-base dark:bg-gray-700'>
										<footer className='mb-2 flex items-center justify-between'>
											<div className='flex items-center'>
												<p className='mr-3 inline-flex items-center text-sm text-gray-700 dark:text-gray-100 '>
													<img
														className='mr-2 h-6 w-6 rounded-full'
														src={comment?.author?.profilePicture}
														alt='Michael Gough'
													/>
													{comment?.author?.username}
												</p>
												<p className='text-sm text-gray-600 dark:text-gray-300'>
													<time
														dateTime='2022-02-08'
														title='February 8th, 2022'>
														{new Date(comment?.createdAt).toLocaleString('en-US', {
															month: 'short',
															day: 'numeric',
															year: 'numeric',
														})}
													</time>
												</p>
											</div>
											<button
												id='dropdownComment1Button'
												data-dropdown-toggle='dropdownComment1'
												className='inline-flex items-center rounded-lg p-2 text-center text-sm font-medium text-gray-400 focus:outline-none hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-100 '
												type='button'>
												<svg
													className='h-5 w-5'
													aria-hidden='true'
													fill='currentColor'
													viewBox='0 0 20 20'
													xmlns='http://www.w3.org/2000/svg'>
													<path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'></path>
												</svg>
												<span className='sr-only'>Comment settings</span>
											</button>

											<div
												id='dropdownComment1'
												className='z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700'>
												<ul
													className='py-1 text-sm text-gray-700 dark:text-gray-200'
													aria-labelledby='dropdownMenuIconHorizontalButton'>
													<li>
														<a
															href='#'
															className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
															Edit
														</a>
													</li>
													<li>
														<a
															href='#'
															className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
															Remove
														</a>
													</li>
													<li>
														<a
															href='#'
															className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
															Report
														</a>
													</li>
												</ul>
											</div>
										</footer>
										<p className='dark:text-white'>{comment?.content}</p>
										<div className='mt-4 flex items-center space-x-4'>
											<button
												type='button'
												className='flex items-center text-sm text-gray-500 hover:text-sky-400 dark:text-gray-300'>
												<svg
													aria-hidden='true'
													className='mr-1 h-4 w-4'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'
													xmlns='http://www.w3.org/2000/svg'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'></path>
												</svg>
												Reply
											</button>
										</div>
									</article>
								))}
							</section>
						</article>
					</div>
				</main>
			</div>
		)
	)
}

export default ArticleDetails
