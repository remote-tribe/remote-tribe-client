import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { UserProfile } from '../components/UserProfile'
import { UserSettings } from '../components/UserSettings'
import { GetCurrentUser } from '../Auth'
import { AccountSettings } from '../components/AccountSettings'
import UserArticles from '../components/UserArticles'
import { useEffect, useState, useContext } from 'react'
import { FadeLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import React, { useRef } from 'react'
import UserFollowing from '../components/UserFollowing'
import UserFollowers from '../components/UserFollowers'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const ProfilePage = () => {
	const [loading, setLoading] = useState(true)
	const { handleLogout } = useContext(UserContext)
	const currentUser = GetCurrentUser()
	const [userData, setUserData] = useState(null)
	const [showSettings, setShowSettings] = useState(false)
	const [showAccountSettings, setShowAccountSettings] = useState(false)
	const [showArticlesSettings, setShowArticlesSettings] = useState(false)
	const [showFollowing, SetShowFollowing] = useState(false)
	const [showFollowers, SetShowFollowers] = useState(false)

	const handleShowSettings = () => {
		setShowSettings(!showSettings)
		setShowArticlesSettings(false)
		SetShowFollowing(false)
		SetShowFollowers(false)
	}
	const handleShowAccountSettings = () => {
		setShowAccountSettings(!showAccountSettings)
		setShowArticlesSettings(false)
		SetShowFollowing(false)
		SetShowFollowers(false)
	}

	const handleShowArticlesSettings = () => {
		setShowArticlesSettings(!showArticlesSettings)
		setShowSettings(false)
		setShowAccountSettings(false)
		SetShowFollowing(false)
		SetShowFollowers(false)
	}

	const handleShowFollowingSettings = () => {
		SetShowFollowing(!showFollowing)
		setShowSettings(false)
		setShowAccountSettings(false)
		setShowArticlesSettings(false)
		SetShowFollowers(false)
	}

	const handleShowFollowersSettings = () => {
		SetShowFollowers(!showFollowers)
		SetShowFollowing(false)
		setShowSettings(false)
		setShowAccountSettings(false)
		setShowArticlesSettings(false)
	}

	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	// handle message
	const handleMessage = () => {
		if (!token) {
			return navigate('/signin')
		} else navigate('/inbox', { state: { user: userData } })
	}

	// set upload images
	const [selectedImage, setSelectedImage] = useState(null)
	const [uploadedImage, setUploadedImage] = useState(null)
	const [uploadedImageURL, setUploadedImageURL] = useState('')
	//START!! handle images
	const fileInputRef = useRef(null)

	const handleImageChange = async (e) => {
		setSelectedImage(e.target.files[0])
		const reader = new FileReader()
		reader.onloadend = () => {
			setUploadedImage(reader.result)
		}
		reader.readAsDataURL(e.target.files[0])

		await handleImageUpload(e.target.files[0])
	}

	const handleImageClick = () => {
		fileInputRef.current.click()
	}
	const handleImageUpload = async (imageFile) => {
		if (!imageFile) return

		// create a FormData
		const formData = new FormData()
		formData.append('file', imageFile)
		formData.append('upload_preset', 'fsgqertv')

		// sent POST request to Cloudinary
		try {
			const res = await axios.post(`https://api.cloudinary.com/v1_1/dxeejm8ef/image/upload`, formData)
			setUploadedImageURL(res.data.url)
			const transformedUrl = `${res.data.url.replace(
				'/image/upload/',
				'/image/upload/c_fill,ar_1:1,h_160,w_160/',
			)}`
			setUploadedImage(transformedUrl)
		} catch (err) {
			console.error('Error uploading image: ', err)
		}
	}

	useEffect(() => {
		if (uploadedImageURL) {
			updateUserProfile()
		}
	}, [uploadedImageURL])

	const updateUserProfile = async () => {
		const updatedUserData = {
			profilePicture: uploadedImageURL,
		}
		console.log(updatedUserData)
		try {
			const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/users/current`, updatedUserData, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`, //！！！！
				},
			})

			if (res.data) {
				console.log('User profile updated successfully')
			}
		} catch (err) {
			console.error('Error updating user profile: ', err)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		const fetchData = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/current`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				setLoading(false)
				setUserData(response.data)
			} catch (error) {
				setLoading(false)
				console.log(error.message)
				if (error.message.includes('401')) {
					handleLogout()
				}
				console.log(error)
			}
		}

		if (token && currentUser) {
			fetchData()
		}
	}, [showSettings])

	// handle current user
	const isCurrentUser = userData?._id === currentUser?.id

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
					<section className='relative py-16 bg-gray-100 dark:bg-gray-800 dark:text-gray-200'>
						<div className='container mx-auto px-4 '>
							<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-700 w-full mb-6 shadow-lg rounded-lg -mt-64'>
								<div className='px-6'>
									<div className='flex flex-wrap justify-center'>
										<div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
											<input
												type='file'
												accept='image/*'
												ref={fileInputRef}
												onChange={handleImageChange}
												style={{ display: 'none' }}
											/>
											{isCurrentUser ? (
												<img
													alt='...'
													src={userData?.profilePicture}
													className='shadow-xl z-10 rounded-full h-40 w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 cursor-pointer object-cover'
													onClick={handleImageClick}
												/>
											) : (
												<img
													alt='...'
													src={userData?.profilePicture}
													className='shadow-xl z-10 rounded-full h-40 w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16  object-cover'
												/>
											)}
										</div>
										<div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
											<div className='py-6 px-3 mt-32 sm:mt-0'>
												{!showSettings && (
													<div className='py-6 px-3 mt-32 sm:mt-0'>
														<button
															onClick={handleShowSettings}
															className='bg-sky-500 hover:bg-sky-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '
															type='button'>
															Settings
														</button>
													</div>
												)}
											</div>
										</div>

										<div className='w-full lg:w-4/12 px-4 lg:order-1'>
											<div className='flex justify-center py-4 lg:pt-4 pt-8'>
												<div className='lg:mr-4 p-3 text-center'>
													<Link className=' text-xl font-bold block uppercase tracking-wide  '>
														<button
															onClick={handleShowFollowersSettings}
															className='bg-transparent text-sky-500 dark:text-sky-400 border-none hover:text-sky-700  font-bold text-2xl ease-linear transition-all duration-150'
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
															className='bg-transparent text-sky-500 dark:text-sky-400 border-none hover:text-sky-700  font-bold text-2xl ease-linear transition-all duration-150'
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
															className='bg-transparent text-sky-500 dark:text-sky-400 border-none hover:text-sky-700  font-bold text-2xl ease-linear transition-all duration-150'
															type='button'>
															{userData.articles?.length}
														</button>
													</Link>
													<span className='text-md '>Articles</span>
												</div>
											</div>
										</div>
									</div>

									{showAccountSettings && (
										<AccountSettings
											userData={userData}
											handleShowAccountSettings={handleShowAccountSettings}
										/>
									)}

									{showSettings && !showAccountSettings && (
										<UserSettings
											userData={userData}
											handleShowSettings={handleShowSettings}
											handleShowAccountSettings={handleShowAccountSettings}
										/>
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

									{!showSettings &&
										!showAccountSettings &&
										!showArticlesSettings &&
										!showFollowers &&
										!showFollowing && (
											<UserProfile
												currentUser={currentUser}
												userData={userData}
												handleShowSettings={handleShowSettings}
												handleShowArticlesSettings={handleShowArticlesSettings}
											/>
										)}
								</div>
							</div>
						</div>
					</section>
				)}
			</main>
		</>
	)
}
