import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { GetCurrentUser } from '../Auth'
import { UserContext } from '../context/UserContext'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Comment from './Comment'

export const ArticleDetails = ({ article, getArticle }) => {
	const [commentValue, setCommentValue] = useState('')
	const currentUser = GetCurrentUser()
	const { handleLogout } = useContext(UserContext)
	const { articleId } = useParams()
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	// set likes
	const [isLiked, setIsLiked] = useState(false)
	const initialLikesNum = parseInt(typeof article.likes === 'number' ? article.likes : 0)
	const [likesNum, setLikesNum] = useState(initialLikesNum)

	// set article date
	const [articleDate, setArticleDate] = useState('')

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

	return (
		article && (
			<div>
				<main className='pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900'>
					<div className='flex justify-between px-4 mx-auto max-w-screen-xl '>
						<article className='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
							<header className='mb-4 lg:mb-6 not-format'>
								<address className='flex items-center mb-6 not-italic'>
									<div className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
										<Link
											to={`/users/${article?.author?._id}`}
											rel='author'
											className='text-xl font-semibold text-sky-500 '>
											<img
												className='mr-4 w-16 h-16 rounded-full'
												src={article?.author?.profilePicture}
												alt={article?.author?.username}
											/>
										</Link>

										<div>
											<Link
												to={`/users/${article?.author?._id}`}
												rel='author'
												className='text-xl font-semibold text-sky-500 '>
												{article?.author?.username}
											</Link>
											<p className='text-base font-light text-gray-500 dark:text-gray-400'>
												{article?.author?.profession}
											</p>
											<p className='text-base font-light text-gray-500 dark:text-gray-400'>
												<time
													dateTime={articleDate}
													title={articleDate}>
													{articleDate}
												</time>
											</p>
										</div>
									</div>
								</address>
								<h1 className='mb-4 text-3xl font-bold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white'>
									{article?.title}
								</h1>
							</header>

							<figure>
								<img
									src={article.imageUrl}
									alt=''
								/>
								<figcaption>Digital art by Anonymous</figcaption>
							</figure>

							<div
								className='my-10 dark:text-white prose'
								dangerouslySetInnerHTML={{ __html: article?.content }}
							/>
							<div className='flex items-center my-4 text-4xl'>
								<button
									className={`inline-flex items-center   justify-center w-fit mx-4 transition-all duration-300 transform-gpu  ${
										isLiked ? 'text-sky-400' : 'text-slate-400 '
									}`}
									onClick={handleLike}>
									<i className='fa-solid fa-thumbs-up  '></i>
								</button>

								<p className=' text-gray-600 mr-4 text-3xl'>{likesNum}</p>
							</div>
							<section className='not-format'>
								<div className='flex justify-between items-center mb-6'>
									<h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
										Discussion ({article?.comments?.length})
									</h2>
								</div>
								<form
									className='mb-6'
									onSubmit={handleSubmit}>
									<div className='ring-sky-400 focus-within:ring-2 py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all duration-150'>
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
											className='px-0 w-full text-sm text-gray-900 border-0  outline-none dark:text-white dark:placeholder-gray-400  dark:bg-gray-800'
											placeholder='Write a comment...'
										/>
									</div>
									<button
										type='submit'
										className='w-1/5 p-1 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500 transition-all duration-150 hover:shadow-md'>
										Post Comment
									</button>
								</form>
								{article?.comments?.map((comment, index) => (
									<article
										key={index}
										className='p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900'>
										<footer className='flex justify-between items-center mb-2'>
											<div className='flex items-center'>
												<p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
													<img
														className='mr-2 w-6 h-6 rounded-full'
														src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
														alt='Michael Gough'
													/>
													{comment?.author?.username}
												</p>
												<p className='text-sm text-gray-600 dark:text-gray-400'>
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
												className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
												type='button'>
												<svg
													className='w-5 h-5'
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
												className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'>
												<ul
													className='py-1 text-sm text-gray-700 dark:text-gray-200'
													aria-labelledby='dropdownMenuIconHorizontalButton'>
													<li>
														<a
															href='#'
															className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
															Edit
														</a>
													</li>
													<li>
														<a
															href='#'
															className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
															Remove
														</a>
													</li>
													<li>
														<a
															href='#'
															className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
															Report
														</a>
													</li>
												</ul>
											</div>
										</footer>
										<p className='dark:text:white'>{comment?.content}</p>
										<div className='flex items-center mt-4 space-x-4'>
											<button
												type='button'
												className='flex items-center text-sm text-gray-500 hover:text-sky-400 dark:text-gray-400'>
												<svg
													aria-hidden='true'
													className='mr-1 w-4 h-4'
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

				<aside
					aria-label='Related articles'
					className='py-8 lg:py-24 bg-gray-50 dark:bg-gray-800'>
					<div className='px-4 mx-auto max-w-screen-xl'>
						<h2 className='mb-8 text-2xl font-bold text-gray-900 dark:text-white'>Related articles</h2>
						<div className='grid gap-12 sm:grid-cols-2 lg:grid-cols-4'>
							<article className='max-w-xs'>
								<a href='#'>
									<img
										src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png'
										className='mb-5 rounded-lg'
										alt='Image 1'
									/>
								</a>
								<h2 className='mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white'>
									<a href='#'>Our first office</a>
								</h2>
								<p className='mb-4 font-light text-gray-500 dark:text-gray-400'>
									Over the past year, Volosoft has undergone many changes! After months of preparation.
								</p>
								<a
									href='#'
									className='inline-flex items-center font-medium hover:text-sky-400 transition-all duration-150 text-primary-600 dark:text-primary-500 hover:no-underline'>
									Read in 2 minutes
								</a>
							</article>
							<article className='max-w-xs'>
								<a href='#'>
									<img
										src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png'
										className='mb-5 rounded-lg'
										alt='Image 2'
									/>
								</a>
								<h2 className='mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white'>
									<a href='#'>Enterprise design tips</a>
								</h2>
								<p className='mb-4 font-light text-gray-500 dark:text-gray-400'>
									Over the past year, Volosoft has undergone many changes! After months of preparation.
								</p>
								<a
									href='#'
									className='inline-flex items-center font-medium hover:text-sky-400 transition-all duration-150 text-primary-600 dark:text-primary-500 hover:no-underline'>
									Read in 12 minutes
								</a>
							</article>
							<article className='max-w-xs'>
								<a href='#'>
									<img
										src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png'
										className='mb-5 rounded-lg'
										alt='Image 3'
									/>
								</a>
								<h2 className='mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white'>
									<a href='#'>We partnered with Google</a>
								</h2>
								<p className='mb-4 font-light text-gray-500 dark:text-gray-400'>
									Over the past year, Volosoft has undergone many changes! After months of preparation.
								</p>
								<a
									href='#'
									className='inline-flex items-center font-medium hover:text-sky-400 transition-all duration-150 text-primary-600 dark:text-primary-500 hover:no-underline'>
									Read in 8 minutes
								</a>
							</article>
							<article className='max-w-xs'>
								<a href='#'>
									<img
										src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png'
										className='mb-5 rounded-lg'
										alt='Image 4'
									/>
								</a>
								<h2 className='mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white'>
									<a href='#'>Our first project with React</a>
								</h2>
								<p className='mb-4 font-light text-gray-500 dark:text-gray-400'>
									Over the past year, Volosoft has undergone many changes! After months of preparation.
								</p>
								<a
									href='#'
									className='inline-flex items-center font-medium hover:text-sky-400 transition-all duration-150 text-primary-600 dark:text-primary-500 hover:no-underline'>
									Read in 4 minutes
								</a>
							</article>
						</div>
					</div>
				</aside>

				<section className='bg-white dark:bg-gray-900'>
					<div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
						<div className='mx-auto max-w-screen-md sm:text-center'>
							<h2 className='mb-4 text-3xl font-bold tracking-tight text-sky-400 sm:text-4xl dark:text-white'>
								Sign up for our newsletter
							</h2>
							<p className='mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400'>
								Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to
								sign up with your email.
							</p>
							<form action='#'>
								<div className='items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0 focus-within:ring-1 ring-sky-400 rounded-md transition-all duration-150 shadow-md'>
									<div className='relative w-full '>
										<label
											htmlFor='email'
											className='hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
											Email address
										</label>
										<div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
											<svg
												className='w-5 h-5 text-gray-500 dark:text-gray-400 '
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'>
												<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
												<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
											</svg>
										</div>
										<input
											className=' ml-8 outline-none text-lg w-full rounded-s border-none py-2 px-4  '
											placeholder='Enter your email'
											type='email'
											id='email'
											required=''
										/>
									</div>

									<button
										type='submit'
										className='w-1/5 p-3 ml-8 bg-sky-400 text-white font-medium rounded-e-md hover:bg-sky-500 transition-all duration-150 hover:shadow-md'>
										Subscribe
									</button>
								</div>
								<div className='mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300'>
									We care about the protection of your data.{' '}
									<a
										href='#'
										className='font-medium text-primary-600 dark:text-primary-500 hover:text-sky-400 text-sky-400'>
										Read our Privacy Policy
									</a>
									.
								</div>
							</form>
						</div>
					</div>
				</section>

				<footer className='bg-gray-50 dark:bg-gray-800'>
					<div className='p-4 py-6 mx-auto max-w-screen-xl md:p-8 lg:p-10'>
						<div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5'>
							<div>
								<h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
									Company
								</h2>
								<ul className='text-gray-500 dark:text-gray-400'>
									<li className='mb-4'>
										<a
											href='#'
											className=' hover:text-sky-400'>
											About
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Careers
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Brand Center
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Blog
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
									Help center
								</h2>
								<ul className='text-gray-500 dark:text-gray-400'>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Discord Server
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Twitter
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Facebook
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Contact Us
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>Legal</h2>
								<ul className='text-gray-500 dark:text-gray-400'>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Privacy Policy
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Licensing
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Terms
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
									Company
								</h2>
								<ul className='text-gray-500 dark:text-gray-400'>
									<li className='mb-4'>
										<a
											href='#'
											className=' hover:text-sky-400'>
											About
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Careers
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Brand Center
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Blog
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
									Download
								</h2>
								<ul className='text-gray-500 dark:text-gray-400'>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											iOS
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Android
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											Windows
										</a>
									</li>
									<li className='mb-4'>
										<a
											href='#'
											className='hover:text-sky-400'>
											MacOS
										</a>
									</li>
								</ul>
							</div>
						</div>
						<hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
						<div className='text-center'>
							<a
								href='#'
								className='flex justify-center items-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-10 h-10 mr-4 text-sky-500 dark:text-sky-400'
									viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='m 24 12 c 0 -0.002 0 -0.004 0 -0.006 c 0 -3.551 -1.546 -6.74 -4.001 -8.933 l -0.012 -0.01 c -0.031 -0.033 -0.064 -0.062 -0.101 -0.087 l -0.002 -0.001 c -2.095 -1.84 -4.859 -2.962 -7.886 -2.962 c -3.032 0 -5.8 1.126 -7.91 2.984 l 0.013 -0.011 c -0.026 0.02 -0.049 0.041 -0.07 0.065 v 0.001 c -2.478 2.205 -4.031 5.403 -4.031 8.963 c 0 3.55 1.544 6.739 3.997 8.933 l 0.012 0.01 c 0 0.003 0.002 0.005 0.005 0.005 c 0.031 0.035 0.065 0.065 0.101 0.092 l 0.002 0.001 c 2.094 1.837 4.857 2.958 7.881 2.958 c 3.032 0 5.801 -1.126 7.911 -2.984 l -0.013 0.011 c 0.03 -0.022 0.056 -0.045 0.08 -0.07 c 2.475 -2.202 4.026 -5.395 4.026 -8.951 c 0 -0.002 0 -0.005 0 -0.007 Z m -4.462 7.805 c -0.576 -0.468 -1.223 -0.897 -1.909 -1.262 l -0.065 -0.032 c 0.613 -1.767 0.982 -3.804 1.017 -5.923 v -0.016 h 4.261 c -0.156 2.852 -1.391 5.388 -3.301 7.23 Z m -6.966 -1.505 c 1.283 0.069 2.482 0.351 3.588 0.81 l -0.072 -0.026 c -0.886 2.02 -2.133 3.408 -3.516 3.713 Z m 0 -1.144 v -4.584 h 4.868 c -0.043 1.961 -0.383 3.828 -0.976 5.578 l 0.039 -0.131 c -1.157 -0.484 -2.498 -0.795 -3.903 -0.862 l -0.027 -0.001 Z m 0 -5.728 v -4.584 c 1.431 -0.069 2.772 -0.379 4.007 -0.891 l -0.079 0.029 c 0.555 1.619 0.896 3.485 0.94 5.425 v 0.021 Z m 0 -5.728 v -4.495 c 1.383 0.305 2.63 1.687 3.516 3.713 c -1.034 0.43 -2.233 0.711 -3.487 0.781 Z m 2.854 -4 c 1.238 0.419 2.312 1.009 3.258 1.752 l -0.023 -0.018 c -0.443 0.348 -0.94 0.676 -1.464 0.961 l -0.056 0.028 c -0.449 -1.047 -1.025 -1.947 -1.724 -2.737 l 0.009 0.011 Z m -4 -0.492 v 4.492 c -1.283 -0.069 -2.482 -0.35 -3.588 -0.81 l 0.072 0.026 c 0.89 -2.02 2.135 -3.407 3.518 -3.712 Z m -4.568 3.212 c -0.58 -0.315 -1.077 -0.642 -1.544 -1.007 l 0.024 0.018 c 0.923 -0.726 1.996 -1.315 3.158 -1.712 l 0.076 -0.023 c -0.689 0.778 -1.265 1.678 -1.689 2.658 l -0.025 0.065 Z m 4.57 2.423 v 4.584 h -4.868 c 0.044 -1.961 0.385 -3.827 0.979 -5.577 l -0.039 0.131 c 1.156 0.483 2.497 0.794 3.901 0.861 Z m 0 5.728 v 4.584 c -1.431 0.069 -2.772 0.379 -4.007 0.891 l 0.079 -0.029 c -0.555 -1.618 -0.896 -3.485 -0.94 -5.425 v -0.021 Z m 0 5.728 v 4.495 c -1.383 -0.305 -2.63 -1.687 -3.516 -3.713 c 1.034 -0.43 2.233 -0.71 3.487 -0.78 l 0.029 -0.001 Z m -2.85 4 c -1.238 -0.418 -2.311 -1.006 -3.258 -1.748 l 0.024 0.018 c 0.443 -0.348 0.94 -0.676 1.464 -0.961 l 0.056 -0.028 c 0.445 1.047 1.022 1.947 1.723 2.733 l -0.009 -0.01 Z m 8.564 -2.72 c 0.58 0.315 1.077 0.642 1.544 1.007 l -0.024 -0.018 c -0.923 0.726 -1.996 1.315 -3.158 1.712 l -0.076 0.023 c 0.689 -0.778 1.265 -1.677 1.689 -2.657 l 0.025 -0.065 Z m 5.7 -8.151 h -4.261 c -0.035 -2.135 -0.404 -4.172 -1.058 -6.078 l 0.041 0.138 c 0.751 -0.399 1.397 -0.828 1.997 -1.312 l -0.024 0.018 c 1.913 1.845 3.148 4.381 3.303 7.205 l 0.001 0.028 Z m -18.38 -7.233 c 0.576 0.468 1.223 0.897 1.909 1.262 l 0.065 0.032 c -0.613 1.767 -0.982 3.804 -1.017 5.923 v 0.016 h -4.262 c 0.156 -2.852 1.391 -5.388 3.301 -7.23 l 0.003 -0.003 Z m -3.304 8.377 h 4.261 c 0.035 2.135 0.404 4.172 1.058 6.078 l -0.041 -0.138 c -0.751 0.399 -1.397 0.828 -1.997 1.312 l 0.024 -0.018 c -1.913 -1.845 -3.148 -4.381 -3.303 -7.205 l -0.001 -0.028 Z'
									/>
								</svg>
								RemoteTribe
							</a>
							<span className='block text-sm text-center text-gray-500 dark:text-gray-400'>
								© 2023{' '}
								<a
									href='#'
									className='hover:text-sky-400'>
									RemoteTribe™
								</a>
								. All Rights Reserved.
							</span>
							<ul className='flex justify-center mt-5 space-x-5'>
								<li>
									<a
										href='#'
										className='text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400'>
										<svg
											className='w-5 h-5'
											fill='currentColor'
											viewBox='0 0 24 24'
											aria-hidden='true'>
											<path
												fillRule='evenodd'
												d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
												clipRule='evenodd'
											/>
										</svg>
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400'>
										<svg
											className='w-5 h-5'
											fill='currentColor'
											viewBox='0 0 24 24'
											aria-hidden='true'>
											<path
												fillRule='evenodd'
												d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
												clipRule='evenodd'
											/>
										</svg>
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400'>
										<svg
											className='w-5 h-5'
											fill='currentColor'
											viewBox='0 0 24 24'
											aria-hidden='true'>
											<path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
										</svg>
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400'>
										<svg
											className='w-5 h-5'
											fill='currentColor'
											viewBox='0 0 24 24'
											aria-hidden='true'>
											<path
												fillRule='evenodd'
												d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
												clipRule='evenodd'
											/>
										</svg>
									</a>
								</li>
								<li>
									<a
										href='#'
										className='text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400'>
										<svg
											className='w-5 h-5'
											fill='currentColor'
											viewBox='0 0 24 24'
											aria-hidden='true'>
											<path
												fillRule='evenodd'
												d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z'
												clipRule='evenodd'
											/>
										</svg>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</footer>
			</div>
		)
	)
}

export default ArticleDetails
