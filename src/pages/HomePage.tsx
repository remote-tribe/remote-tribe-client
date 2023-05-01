import axios from 'axios'
import { GetCurrentUser } from '../Auth'
import { FadeLoader } from 'react-spinners'

import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

import { useEffect, useContext, useState, lazy } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import React from 'react'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

type Article = {
	_id: string
	title: string
	imageUrl?: string
}

const Carousel = lazy(() =>
	import('react-responsive-carousel').then((module) => ({ default: module.Carousel })),
)
const ContactForm = lazy(() => import('../components/ContactForm'))

const HomePage = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [showForm, setShowForm] = useState(false)
	const [alert, showAlert] = useState<string>('')
	const [articles, setArticles] = useState<Article[]>([])
	const { loggedUser, setLoggedUser } = useContext(UserContext)
	const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1000)

	useEffect(() => {
		getAllArticles()
	}, [])

	useEffect(() => {
		const currentUser = GetCurrentUser()
		setLoggedUser(currentUser)
		setLoading(false)
	}, [])

	useEffect(() => {
		function handleResize() {
			setIsLargeScreen(window.innerWidth >= 1000)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const toggleForm = () => {
		setShowForm(!showForm)
	}

	const getAllArticles = () => {
		setLoading(true)
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/community/articles`)
			.then(({ data }) => {
				setLoading(false)
				setArticles(data)
			})
			.catch((error) => {
				setLoading(false)
				console.log(error)
			})
	}

	return (
		<>
			{loading ? (
				<div className='mt-60 flex justify-center text-center text-sky-400 '>
					<FadeLoader
						color={'#00a8e8'}
						loading={loading}
						css={override}
						size={150}
					/>
				</div>
			) : (
				<>
					{showForm ? (
						<ContactForm
							alert={alert}
							showAlert={showAlert}
							toggleForm={toggleForm}
						/>
					) : (
						<>
							{alert && (
								<div
									className=' fade-in-2 absolute left-[43.5%]  mx-auto my-3 w-fit rounded border border-green-700 bg-green-600 px-8 py-3 text-white dark:bg-green-500'
									role='alert'>
									<span className='block sm:inline'>{alert}</span>
								</div>
							)}
							<main className='flex h-full items-center bg-sky-500 px-6 text-white dark:bg-sky-900 lg:px-32 '>
								<section className='body-font fade-in-2 text-gray-700'>
									<div className='container mx-auto flex flex-col items-center p-8 px-5 md:flex-row md:py-20'>
										<div className='mb-10 w-full  md:mb-0 md:w-1/2 lg:w-full lg:max-w-3xl'>
											<img
												className='rounded-md object-cover object-center shadow-md '
												alt='hero'
												src='https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
											/>
										</div>
										<div className='flex flex-col items-center text-center md:w-1/2 md:items-start md:pl-16 md:text-left lg:flex-grow lg:pl-24'>
											<h1
												style={{ fontFamily: 'MuseoModerno' }}
												className='title-font font-moderno mb-4 text-3xl font-medium text-sky-800 dark:text-sky-400 sm:text-6xl '>
												Remote Tribe{' '}
											</h1>
											<h2 className='title-font mb-4 text-2xl font-medium text-white sm:text-4xl '>
												Work Remotely as a Developer and Live on Your Own Terms
											</h2>

											<p className='mb-8 font-medium leading-relaxed text-white '>
												Finding a remote developer job can be daunting - but it doesn't have to be. At Remote
												Tribe, we've made it easy. Our platform connects you with the best remote job
												opportunities from around the world, and our community of like-minded developers
												provides support and guidance every step of the way. Join the tribe today and start
												your remote work journey.
											</p>
											<div className='flex justify-center'>
												<button
													onClick={() => navigate('/community')}
													className='inline-flex rounded border-0 bg-sky-600 px-6 py-2 text-xl text-white shadow transition-all duration-150 focus:outline-none hover:bg-sky-700'>
													Explore
												</button>
												{loggedUser ? (
													<button
														onClick={() => setShowForm(true)}
														className='ml-4 inline-flex rounded border-0 bg-gray-100 px-6 py-2 text-xl text-gray-700 shadow transition-all duration-150 focus:outline-none hover:bg-gray-300 hover:text-gray-900'>
														Contact Us
													</button>
												) : (
													<button
														onClick={() => navigate('/signin')}
														className='ml-4 inline-flex rounded border-0 bg-gray-100 px-6 py-2 text-xl text-gray-700 shadow transition-all duration-150 focus:outline-none hover:bg-gray-300 hover:text-gray-900'>
														Join Now
													</button>
												)}
											</div>
										</div>
									</div>
								</section>
							</main>
							{isLargeScreen ? (
								<Carousel
									className='fade-in-2'
									infiniteLoop={true}
									autoPlay={true}
									showThumbs={false}
									showStatus={false}
									showIndicators={false}
									interval={5000}
									centerSlidePercentage={25}
									centerMode={true}>
									{articles?.slice(0, 4).map((article, index) => (
										<Link
											to={`/community/article/${article?._id}`}
											key={index}
											className=' dark:text-gray-60 mt-4 flex w-[49%] cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 focus:scale-105 hover:-translate-y-1 hover:shadow-md dark:bg-gray-300  dark:hover:shadow-gray-600'>
											{article?.imageUrl ? (
												<img
													loading='lazy'
													className='h-2/3 w-full'
													src={article?.imageUrl}
													alt={article?.title}
												/>
											) : (
												<div className='h-64 w-full bg-gradient-to-tl from-sky-300 to-sky-700 object-cover object-center dark:from-sky-500 dark:to-sky-900 '></div>
											)}

											<div className='flex justify-center px-4 py-4'>
												<div className='mb-2 text-sm font-medium'>{article?.title}</div>
											</div>
										</Link>
									))}
								</Carousel>
							) : (
								<Carousel
									className='fade-in-2'
									infiniteLoop={true}
									autoPlay={true}
									showThumbs={false}
									showStatus={false}
									showIndicators={false}
									interval={5000}
									centerMode={false}>
									{articles?.slice(0, 4).map((article, index) => (
										<Link
											to={`/community/article/${article?._id}`}
											key={index}
											className='mx-auto mt-4 flex h-52 w-2/3 cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 focus:scale-105 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-300 dark:text-gray-600 md:w-72'>
											{article?.imageUrl ? (
												<img
													loading='lazy'
													className='h-2/3 w-full  '
													src={article?.imageUrl}
													alt={article?.title}
												/>
											) : (
												<div className='h-2/3 w-full bg-sky-300 object-cover object-center dark:bg-sky-700'></div>
											)}

											<div className='flex justify-center px-4 py-4 '>
												<div className='mb-2 text-sm font-semibold  '>{article?.title}</div>
											</div>
										</Link>
									))}
								</Carousel>
							)}
							<footer className='m-10  bg-gray-100 pt-10 dark:bg-gray-800'>
								<div className='flex flex-col items-center'>
									<Link
										to={''}
										className='mb-5 flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='mr-4 h-10 w-10 text-sky-500 dark:text-sky-400'
											viewBox='0 0 24 24'>
											<path
												fill='currentColor'
												d='m 24 12 c 0 -0.002 0 -0.004 0 -0.006 c 0 -3.551 -1.546 -6.74 -4.001 -8.933 l -0.012 -0.01 c -0.031 -0.033 -0.064 -0.062 -0.101 -0.087 l -0.002 -0.001 c -2.095 -1.84 -4.859 -2.962 -7.886 -2.962 c -3.032 0 -5.8 1.126 -7.91 2.984 l 0.013 -0.011 c -0.026 0.02 -0.049 0.041 -0.07 0.065 v 0.001 c -2.478 2.205 -4.031 5.403 -4.031 8.963 c 0 3.55 1.544 6.739 3.997 8.933 l 0.012 0.01 c 0 0.003 0.002 0.005 0.005 0.005 c 0.031 0.035 0.065 0.065 0.101 0.092 l 0.002 0.001 c 2.094 1.837 4.857 2.958 7.881 2.958 c 3.032 0 5.801 -1.126 7.911 -2.984 l -0.013 0.011 c 0.03 -0.022 0.056 -0.045 0.08 -0.07 c 2.475 -2.202 4.026 -5.395 4.026 -8.951 c 0 -0.002 0 -0.005 0 -0.007 Z m -4.462 7.805 c -0.576 -0.468 -1.223 -0.897 -1.909 -1.262 l -0.065 -0.032 c 0.613 -1.767 0.982 -3.804 1.017 -5.923 v -0.016 h 4.261 c -0.156 2.852 -1.391 5.388 -3.301 7.23 Z m -6.966 -1.505 c 1.283 0.069 2.482 0.351 3.588 0.81 l -0.072 -0.026 c -0.886 2.02 -2.133 3.408 -3.516 3.713 Z m 0 -1.144 v -4.584 h 4.868 c -0.043 1.961 -0.383 3.828 -0.976 5.578 l 0.039 -0.131 c -1.157 -0.484 -2.498 -0.795 -3.903 -0.862 l -0.027 -0.001 Z m 0 -5.728 v -4.584 c 1.431 -0.069 2.772 -0.379 4.007 -0.891 l -0.079 0.029 c 0.555 1.619 0.896 3.485 0.94 5.425 v 0.021 Z m 0 -5.728 v -4.495 c 1.383 0.305 2.63 1.687 3.516 3.713 c -1.034 0.43 -2.233 0.711 -3.487 0.781 Z m 2.854 -4 c 1.238 0.419 2.312 1.009 3.258 1.752 l -0.023 -0.018 c -0.443 0.348 -0.94 0.676 -1.464 0.961 l -0.056 0.028 c -0.449 -1.047 -1.025 -1.947 -1.724 -2.737 l 0.009 0.011 Z m -4 -0.492 v 4.492 c -1.283 -0.069 -2.482 -0.35 -3.588 -0.81 l 0.072 0.026 c 0.89 -2.02 2.135 -3.407 3.518 -3.712 Z m -4.568 3.212 c -0.58 -0.315 -1.077 -0.642 -1.544 -1.007 l 0.024 0.018 c 0.923 -0.726 1.996 -1.315 3.158 -1.712 l 0.076 -0.023 c -0.689 0.778 -1.265 1.678 -1.689 2.658 l -0.025 0.065 Z m 4.57 2.423 v 4.584 h -4.868 c 0.044 -1.961 0.385 -3.827 0.979 -5.577 l -0.039 0.131 c 1.156 0.483 2.497 0.794 3.901 0.861 Z m 0 5.728 v 4.584 c -1.431 0.069 -2.772 0.379 -4.007 0.891 l 0.079 -0.029 c -0.555 -1.618 -0.896 -3.485 -0.94 -5.425 v -0.021 Z m 0 5.728 v 4.495 c -1.383 -0.305 -2.63 -1.687 -3.516 -3.713 c 1.034 -0.43 2.233 -0.71 3.487 -0.78 l 0.029 -0.001 Z m -2.85 4 c -1.238 -0.418 -2.311 -1.006 -3.258 -1.748 l 0.024 0.018 c 0.443 -0.348 0.94 -0.676 1.464 -0.961 l 0.056 -0.028 c 0.445 1.047 1.022 1.947 1.723 2.733 l -0.009 -0.01 Z m 8.564 -2.72 c 0.58 0.315 1.077 0.642 1.544 1.007 l -0.024 -0.018 c -0.923 0.726 -1.996 1.315 -3.158 1.712 l -0.076 0.023 c 0.689 -0.778 1.265 -1.677 1.689 -2.657 l 0.025 -0.065 Z m 5.7 -8.151 h -4.261 c -0.035 -2.135 -0.404 -4.172 -1.058 -6.078 l 0.041 0.138 c 0.751 -0.399 1.397 -0.828 1.997 -1.312 l -0.024 0.018 c 1.913 1.845 3.148 4.381 3.303 7.205 l 0.001 0.028 Z m -18.38 -7.233 c 0.576 0.468 1.223 0.897 1.909 1.262 l 0.065 0.032 c -0.613 1.767 -0.982 3.804 -1.017 5.923 v 0.016 h -4.262 c 0.156 -2.852 1.391 -5.388 3.301 -7.23 l 0.003 -0.003 Z m -3.304 8.377 h 4.261 c 0.035 2.135 0.404 4.172 1.058 6.078 l -0.041 -0.138 c -0.751 0.399 -1.397 0.828 -1.997 1.312 l 0.024 -0.018 c -1.913 -1.845 -3.148 -4.381 -3.303 -7.205 l -0.001 -0.028 Z'
											/>
										</svg>
										Developed By
									</Link>

									<ul className='mt-5 flex flex-col items-center justify-center text-xl md:flex-row '>
										<div className='items-center justify-center md:flex'>
											<Link
												to={'https://www.linkedin.com/in/marin-valenta'}
												target='_blank'
												className='my-5 text-center font-semibold  text-gray-900 transition-all duration-150 hover:text-sky-500 dark:text-white md:my-0 md:mr-4'>
												Marin Valenta
											</Link>
											<div className='mt-2 flex justify-center  space-x-4'>
												<li>
													<Link
														to={'https://www.linkedin.com/in/marin-valenta'}
														target='_blank'
														className='text-sky-500 transition-all duration-150 hover:text-sky-600 '>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='24'
															height='24'
															viewBox='0 0 24 24'>
															<path
																fill='currentColor'
																d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
															/>
														</svg>
													</Link>
												</li>
												<li>
													<Link
														to={'https://github.com/valyy151'}
														target='_blank'
														className=' text-sky-500 transition-all duration-150 hover:text-sky-600'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='24'
															height='24'
															viewBox='0 0 24 24'>
															<path
																fill='currentColor'
																d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z'
															/>
														</svg>
													</Link>
												</li>
											</div>
										</div>
										<p className='my-3 text-xl font-semibold text-gray-900 dark:text-white md:mx-4'>&&</p>
										<div className='items-center justify-center md:flex md:flex-row-reverse	'>
											<Link
												to={'https://www.linkedin.com/in/peng-chen-472560260'}
												target='_blank'
												className='text-l mb-5 text-center font-semibold text-gray-900 transition-all duration-150 hover:text-sky-500 dark:text-white md:mb-0 md:ml-4'>
												Peng Chen
											</Link>
											<div className='mt-2 flex justify-center space-x-4'>
												<li>
													<Link
														to={'https://github.com/Mr-Chennn'}
														target='_blank'
														className='text-sky-500 transition-all duration-150 hover:text-sky-600'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='24'
															height='24'
															viewBox='0 0 24 24'>
															<path
																fill='currentColor'
																d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z'
															/>
														</svg>
													</Link>
												</li>

												<li>
													<Link
														to={'https://www.linkedin.com/in/peng-chen-472560260'}
														target='_blank'
														className='text-sky-500 transition-all duration-150 hover:text-sky-600'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='24'
															height='24'
															viewBox='0 0 24 24'>
															<path
																fill='currentColor'
																d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
															/>
														</svg>
													</Link>
												</li>
											</div>
										</div>
									</ul>
								</div>
							</footer>
						</>
					)}
				</>
			)}
		</>
	)
}

export default React.memo(HomePage)
