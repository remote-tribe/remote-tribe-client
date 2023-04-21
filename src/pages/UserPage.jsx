import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../components/UserProfile'
import { Conversation } from '../components/Conversation'
import { GetCurrentUser } from '../Auth'
import { FadeLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import UserArticles from '../components/UserArticles'
import UserFollowers from '../components/UserFollowers'
import UserFollowing from '../components/UserFollowing'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const UserPage = () => {
	const token = localStorage.getItem('token')
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)
	const [showConversation, setShowConversation] = useState(false)
	const [userData, setUserData] = useState(null)
	const { userId } = useParams()
	const currentUser = GetCurrentUser()
	const isCurrentUser = userData?._id === currentUser?.id
	const [currentUserFollowing, setCurrentUserFollowing] = useState([])
	const [isFollowing, setIsFollowing] = useState(false)
	const [showArticlesSettings, setShowArticlesSettings] = useState(false)
	const [showFollowing, SetShowFollowing] = useState(false)
	const [showFollowers, SetShowFollowers] = useState(false)
	const [showProfile, setShowProfile] = useState(true)

	const handleFollow = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/api/user/following`,
				{
					userId: userData?._id,
					currentUserId: currentUser?.id,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			fetchUser()
			fetchCurrentUserFollowing()
			console.log(response.data.message)
		} catch (err) {
			console.error('Error updating user profile: ', err)
		}
	}

	const handleMessage = () => {
		if (!token) {
			return navigate('/signin')
		} else navigate('/inbox', { state: { user: userData } })
	}

	const handleUnfollow = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/api/user/unfollowing`,
				{
					userId: userData?._id,
					currentUserId: currentUser?.id,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			fetchUser()
			fetchCurrentUserFollowing()
			console.log(response.data.message)
		} catch (err) {
			console.error('Error updating user profile: ', err)
		}
	}
	const fetchCurrentUserFollowing = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/api/user/${currentUser?.id}/following`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			setCurrentUserFollowing(response.data.following)
		} catch (err) {
			console.error('Error fetching user following list: ', err)
		}
	}

	useEffect(() => {
		fetchCurrentUserFollowing()
	}, [])

	useEffect(() => {
		if (currentUserFollowing.includes(userData?._id)) {
			setIsFollowing(true)
		} else {
			setIsFollowing(false)
		}
	}, [currentUserFollowing, userData])

	const fetchUser = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user?userId=${userId}`)
			setLoading(false)
			setUserData(response.data)
		} catch (error) {
			setLoading(false)
			console.error(error)
		}
	}

	useEffect(() => {
		if (userId === currentUser?.id) {
			navigate('/profile')
		}
		fetchUser()
	}, [])

	const handleShowArticlesSettings = () => {
		setShowArticlesSettings(!showArticlesSettings)
		SetShowFollowing(false)
		SetShowFollowers(false)
		if (showProfile === true) {
			setShowProfile(false)
		}
	}

	const handleShowFollowingSettings = () => {
		SetShowFollowing(!showFollowing)
		setShowArticlesSettings(false)
		SetShowFollowers(false)
		if (showProfile === true) {
			setShowProfile(false)
		}
	}

	const handleShowFollowersSettings = () => {
		SetShowFollowers(!showFollowers)
		SetShowFollowing(false)
		setShowArticlesSettings(false)
		if (showProfile === true) {
			setShowProfile(false)
		}
	}

	return loading ? (
		<div className='text-center text-sky-400 flex justify-center mt-60 '>
			<FadeLoader
				color={'#00a8e8'}
				loading={loading}
				css={override}
				size={150}
			/>
		</div>
	) : (
		<>
			<main className='profile-page'>
				<section className='relative block h-80'>
					<div className='w-full h-full bg-center bg-cover'>
						<span className='w-full h-full absolute opacity-50 dark:bg-sky-800 bg-sky-400'></span>
					</div>
					<div className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16'>
						<svg
							className='absolute bottom-0 overflow-hidden '
							xmlns='http://www.w3.org/2000/svg'
							preserveAspectRatio='none'
							version='1.1'
							viewBox='0 0 2560 100'
							x='0'
							y='0'></svg>
					</div>
				</section>
				{userData && (
					<section className='relative py-16 bg-gray-100 dark:bg-gray-800 '>
						<div className='container mx-auto px-4 '>
							<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-700 w-full mb-6 shadow-lg rounded-lg -mt-64 dark:text-gray-200'>
								<div className='px-6'>
									<div className='flex flex-wrap justify-center'>
										<div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
											<img
												alt='...'
												src={userData?.profilePicture}
												className='shadow-xl z-10 rounded-full h-40 w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 object-cover fade-in-2'
											/>
										</div>
										<div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
											<div className='py-6 px-3 mt-32 sm:mt-0'>
												<div className='py-6 px-3 mt-32 sm:mt-0 fade-in-2'>
													{isCurrentUser ? (
														<button
															className='bg-sky-500 hover:bg-sky-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '
															type='button'>
															Settings
														</button>
													) : (
														<>
															<button
																onClick={handleMessage}
																className='bg-sky-400 hover:bg-sky-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '
																type='button'>
																Message
															</button>
															{isFollowing ? (
																<button
																	onClick={handleUnfollow}
																	className='bg-rose-500 hover:bg-rose-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '
																	type='button'>
																	Unfollow
																</button>
															) : (
																<button
																	onClick={handleFollow}
																	className='bg-sky-600 hover:bg-sky-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '
																	type='button'>
																	Follow
																</button>
															)}
														</>
													)}
												</div>
											</div>
										</div>

										<div className='w-full lg:w-4/12 px-4 lg:order-1'>
											<div className='flex justify-center py-4 lg:pt-4 pt-8 fade-in-2'>
												<div className='lg:mr-4 p-3 text-center '>
													<Link className=' text-xl font-bold block uppercase tracking-wide  '>
														<button
															onClick={handleShowFollowersSettings}
															className='bg-transparent text-sky-500 border-none hover:text-sky-700  font-bold text-2xl ease-linear transition-all duration-150'
															type='button'>
															{userData.followers?.length}
														</button>
													</Link>
													<span className='text-md '>Followers</span>
												</div>
												<div className='mr-4 p-3 text-center'>
													<Link className='text-xl font-bold block uppercase tracking-wide '>
														<button
															onClick={handleShowFollowingSettings}
															className='bg-transparent text-sky-500 border-none hover:text-sky-700  font-bold text-2xl ease-linear transition-all duration-150'
															type='button'>
															{userData.following?.length}
														</button>
													</Link>
													<span className='text-md '>Following</span>
												</div>
												<div className='mr-4 p-3 text-center'>
													<Link className='text-xl font-bold block uppercase tracking-wide '>
														<button
															onClick={handleShowArticlesSettings}
															className='bg-transparent text-sky-500 border-none hover:text-sky-700  font-bold text-2xl ease-linear transition-all duration-150'
															type='button'>
															{userData.articles?.length}
														</button>
													</Link>
													<span className='text-md '>Articles</span>
												</div>
											</div>
										</div>
									</div>

									<main className='profile-page'>
										{userData && !showArticlesSettings && !showFollowers && !showFollowing && (
											<section className='relative block h-80'>
												<div className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16'>
													<svg
														className='absolute bottom-0 overflow-hidden '
														xmlns='http://www.w3.org/2000/svg'
														preserveAspectRatio='none'
														version='1.1'
														viewBox='0 0 2560 100'
														x='0'
														y='0'></svg>
												</div>
											</section>
										)}

										{userData && !showArticlesSettings && !showFollowers && !showFollowing && (
											<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-700 w-full mb-6  rounded-lg -mt-64 dark:text-gray-200 fade-in-2'>
												<div className='px-6'>
													<div className='flex flex-wrap justify-center'></div>

													<div className='text-center mt-12'>
														<h3 className='text-4xl font-semibold leading-normal mb-2 '>
															{userData?.username}
														</h3>
														{userData?.location && (
															<div className='text-sm leading-normal mt-10 mb-2 text-blueGray-400 font-bold uppercase'>
																<i className='fas fa-solid fa-location-dot text-sky-500 text-2xl mr-2'></i>
																{userData?.location?.city}
																{userData?.location?.city && userData?.location.country && ','}{' '}
																{userData?.location?.country}
															</div>
														)}
														<div className='mb-2 text-lg text-blueGray-600 font-medium mt-10'>
															{userData?.profession && (
																<div className='mb-2 text-lg text-blueGray-600 font-medium mt-10'>
																	<Link
																		to={``}
																		className='transition-all font-normal text-blueGray-500 hover:text-sky-400'>
																		{' '}
																		{userData?.profession}
																	</Link>
																</div>
															)}
														</div>
													</div>
													<div className='mt-10 pt-4 border-t dark:border-slate-600 border-blueGray-200 text-center'>
														<div className='flex flex-wrap justify-center'>
															<div className='w-full lg:w-9/12 px-4'>
																<p className='mb-4 text-lg leading-relaxed text-blueGray-700'>
																	{userData?.description}
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										)}
										{showArticlesSettings && (
											<UserArticles
												currentUser={currentUser}
												userData={userData}
												handleShowArticlesSettings={handleShowArticlesSettings}
											/>
										)}

										{showFollowing && (
											<UserFollowing
												currentUser={currentUser}
												userData={userData}
												handleShowFollowingSettings={handleShowFollowingSettings}
											/>
										)}

										{showFollowers && (
											<UserFollowers
												currentUser={currentUser}
												userData={userData}
												handleShowFollowersSettings={handleShowFollowersSettings}
											/>
										)}
									</main>
								</div>
							</div>
						</div>
					</section>
				)}
			</main>
		</>
	)
}
