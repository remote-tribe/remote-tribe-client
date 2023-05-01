import axios from 'axios'
import { Link } from 'react-router-dom'
import { GetCurrentUser } from '../Auth'
import { useState, useEffect } from 'react'
import { FadeLoader } from 'react-spinners'
import { useParams, useNavigate } from 'react-router-dom'
import { UserArticles } from '../components/UserArticles'
import { UserFollowers } from '../components/UserFollowers'
import { UserFollowing } from '../components/UserFollowing'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

interface UserData {
	username: string
	_id: any
	profilePicture: string
	followers: object[]
	following: object[]
	articles: object[]
	profession: string
	description: string
	location: { country: string; city: string }
}

interface CurrentUser {
	id: string
	username: string
}

const UserPage = () => {
	const navigate = useNavigate()
	const { userId } = useParams<{ userId: string }>()
	const currentUser = GetCurrentUser() as CurrentUser | null
	const token: string | null = localStorage.getItem('token')
	const [loading, setLoading] = useState(true)
	const [userData, setUserData] = useState<UserData | null>(null)
	const [showProfile, setShowProfile] = useState(true)
	const [isFollowing, setIsFollowing] = useState(false)
	const isCurrentUser = userData?._id === currentUser?.id
	const [showFollowing, SetShowFollowing] = useState(false)
	const [showFollowers, SetShowFollowers] = useState(false)
	const [currentUserFollowing, setCurrentUserFollowing] = useState<string[]>([])
	const [showArticlesSettings, setShowArticlesSettings] = useState(false)

	// Handles the "Follow" button click by making an API call to follow the user.
	const handleFollow = async () => {
		const token = localStorage.getItem('token')
		try {
			await axios.post(
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
		} catch (err) {
			console.error('Error updating user profile: ', err)
		}
	}

	// Handles the "Unfollow" button click by making an API call to unfollow the user.
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

	// Handles the "Message" button click by navigating to the user's inbox page.
	const handleMessage = () => {
		if (!token) {
			return navigate('/signin')
		} else navigate('/inbox', { state: { user: userData } })
	}

	// Fetches the list of users that the current user is following.
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

	// Determines whether the current user is following the displayed user.
	useEffect(() => {
		if (currentUserFollowing.includes(userData?._id)) {
			setIsFollowing(true)
		} else {
			setIsFollowing(false)
		}
	}, [currentUserFollowing, userData])

	// Fetches the displayed user's data from the server
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

	// Determines whether the current user is the displayed user and redirects them to their profile page.
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
			<main className='profile-page'>
				<section className='relative block h-80'>
					<div className='h-full w-full bg-cover bg-center'>
						<span className='absolute h-full w-full bg-sky-400 opacity-50 dark:bg-sky-800'></span>
					</div>
					<div className='pointer-events-none absolute bottom-0 left-0 right-0 top-auto h-16 w-full overflow-hidden'>
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
					<section className='relative bg-gray-100 py-16 dark:bg-gray-800 '>
						<div className='container mx-auto px-4 '>
							<div className='relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg dark:bg-slate-700 dark:text-gray-200'>
								<div className='px-6'>
									<div className='flex flex-wrap justify-center'>
										<div className='flex w-full justify-center px-4 lg:order-2 lg:w-3/12'>
											<img
												alt='...'
												src={userData?.profilePicture}
												className='fade-in-2 absolute z-10 -m-16 -ml-20 h-40 w-40 rounded-full border-none object-cover align-middle shadow-xl lg:-ml-16'
											/>
										</div>
										<div className='w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right'>
											<div className='mt-32 px-3 py-6 sm:mt-0'>
												<div className='fade-in-2 mt-32 px-3 py-6 sm:mt-0'>
													{isCurrentUser ? (
														<button
															className='mb-1 rounded bg-sky-500 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2 '
															type='button'>
															Settings
														</button>
													) : (
														<>
															<button
																onClick={handleMessage}
																className='mb-1 rounded bg-sky-400 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-500 hover:shadow-md sm:mr-2 '
																type='button'>
																Message
															</button>
															{isFollowing ? (
																<button
																	onClick={handleUnfollow}
																	className='mb-1 rounded bg-rose-500 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-rose-600 hover:shadow-md sm:mr-2 '
																	type='button'>
																	Unfollow
																</button>
															) : (
																<button
																	onClick={handleFollow}
																	className='mb-1 rounded bg-sky-600 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-700 hover:shadow-md sm:mr-2 '
																	type='button'>
																	Follow
																</button>
															)}
														</>
													)}
												</div>
											</div>
										</div>

										<div className='w-full px-4 lg:order-1 lg:w-4/12'>
											<div className='fade-in-2 flex justify-center py-4 pt-8 lg:pt-4'>
												<div className='p-3 text-center lg:mr-4 '>
													<Link
														to={''}
														className=' block text-xl font-bold uppercase tracking-wide  '>
														<button
															onClick={handleShowFollowersSettings}
															className='border-none bg-transparent text-2xl font-bold  text-sky-500 transition-all duration-150 ease-linear hover:text-sky-700'
															type='button'>
															{userData.followers?.length}
														</button>
													</Link>
													<span className='text-md '>Followers</span>
												</div>
												<div className='mr-4 p-3 text-center'>
													<Link
														to={''}
														className='block text-xl font-bold uppercase tracking-wide '>
														<button
															onClick={handleShowFollowingSettings}
															className='border-none bg-transparent text-2xl font-bold  text-sky-500 transition-all duration-150 ease-linear hover:text-sky-700'
															type='button'>
															{userData.following?.length}
														</button>
													</Link>
													<span className='text-md '>Following</span>
												</div>
												<div className='mr-4 p-3 text-center'>
													<Link
														to={''}
														className='block text-xl font-bold uppercase tracking-wide '>
														<button
															onClick={handleShowArticlesSettings}
															className='border-none bg-transparent text-2xl font-bold  text-sky-500 transition-all duration-150 ease-linear hover:text-sky-700'
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
												<div className='pointer-events-none absolute bottom-0 left-0 right-0 top-auto h-16 w-full overflow-hidden'>
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
											<div className='fade-in-2 relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words  rounded-lg bg-white dark:bg-slate-700 dark:text-gray-200'>
												<div className='px-6'>
													<div className='flex flex-wrap justify-center'></div>

													<div className='mt-12 text-center'>
														<h3 className='mb-2 text-4xl font-semibold leading-normal '>
															{userData?.username}
														</h3>
														{userData?.location && (
															<div className='text-blueGray-400 mb-2 mt-10 text-sm font-bold uppercase leading-normal'>
																<i className='fas fa-solid fa-location-dot mr-2 text-2xl text-sky-500'></i>
																{userData?.location?.city}
																{userData?.location?.city && userData?.location.country && ','}{' '}
																{userData?.location?.country}
															</div>
														)}
														<div className='text-blueGray-600 mb-2 mt-10 text-lg font-medium'>
															{userData?.profession && (
																<div className='text-blueGray-600 mb-2 mt-10 text-lg font-medium'>
																	<Link
																		to={``}
																		className='text-blueGray-500 font-normal transition-all hover:text-sky-400'>
																		{' '}
																		{userData?.profession}
																	</Link>
																</div>
															)}
														</div>
													</div>
													<div className='border-blueGray-200 mt-10 border-t pt-4 text-center dark:border-slate-600'>
														<div className='flex flex-wrap justify-center'>
															<div className='w-full px-4 lg:w-9/12'>
																<p className='text-blueGray-700 mb-4 text-lg leading-relaxed'>
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
												userData={userData}
												handleShowArticlesSettings={handleShowArticlesSettings}
											/>
										)}

										{showFollowing && <UserFollowing userData={userData} />}

										{showFollowers && <UserFollowers userData={userData} />}
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

export default UserPage
