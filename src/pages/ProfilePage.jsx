import React, { useRef, useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../context/UserContext'
import { UserProfile } from '../components/UserProfile'
import { UserSettings } from '../components/UserSettings'
import { UserArticles } from '../components/UserArticles'
import { UserFollowing } from '../components/UserFollowing'
import { UserFollowers } from '../components/UserFollowers'
import { AccountSettings } from '../components/AccountSettings'

import axios from 'axios'
import { GetCurrentUser } from '../Auth'

import { FadeLoader } from 'react-spinners'
const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const ProfilePage = () => {
	const [loading, setLoading] = useState(true)
	const [userData, setUserData] = useState(null)
	const [loadingImg, setLoadingImg] = useState(false)
	const [showSettings, setShowSettings] = useState(false)
	const [uploadedImage, setUploadedImage] = useState(null)
	const [showFollowing, SetShowFollowing] = useState(false)
	const [showFollowers, SetShowFollowers] = useState(false)
	const [uploadedImageURL, setUploadedImageURL] = useState('')
	const [showAccountSettings, setShowAccountSettings] = useState(false)
	const [showArticlesSettings, setShowArticlesSettings] = useState(false)

	const fileInputRef = useRef(null)
	const currentUser = GetCurrentUser()
	const token = localStorage.getItem('token')
	const { handleLogout } = useContext(UserContext)

	const isCurrentUser = userData?._id === currentUser?.id

	useEffect(() => {
		if (uploadedImageURL) {
			updateUserImage()
		}
	}, [uploadedImageURL])

	useEffect(() => {
		const token = localStorage.getItem('token')

		if (token && currentUser) {
			fetchData()
		}
	}, [showSettings, uploadedImage])

	const fetchData = async () => {
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/current`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			setUserData(data)
		} catch (error) {
			console.error(error)
			if (axios.isAxiosError(error) && error.response.status === 401) {
				handleLogout()
			}
		} finally {
			setLoading(false)
		}
	}

	const updateUserImage = async () => {
		try {
			await axios.put(
				`${import.meta.env.VITE_BASE_URL}/api/users/current`,
				{
					profilePicture: uploadedImageURL,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				},
			)
		} catch (err) {
			console.error('Error updating user profile: ', err)
		}
	}

	// Image handling

	const handleImageClick = () => {
		fileInputRef.current.click()
	}

	const handleImageChange = async (event) => {
		try {
			const selectedImage = event.target.files[0]

			const reader = new FileReader()
			reader.onloadend = () => {
				setUploadedImage(reader.result)
			}
			reader.readAsDataURL(selectedImage)

			await handleImageUpload(selectedImage)
		} catch (error) {
			console.error(error)
		} finally {
			setLoadingImg(false)
		}
	}

	const handleImageUpload = async (image) => {
		if (!image) {
			return
		}

		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', 'fsgqertv')

		try {
			setLoadingImg(true)

			const response = await axios.post('https://api.cloudinary.com/v1_1/dxeejm8ef/image/upload', formData)

			const uploadedImageUrl = response.data.url
			const transformedUrl = `${uploadedImageUrl.replace(
				'/image/upload/',
				'/image/upload/c_fill,ar_1:1,h_160,w_160/',
			)}`

			setUploadedImageURL(uploadedImageUrl)
			setUploadedImage(transformedUrl)
			setLoadingImg(false)
		} catch (error) {
			setLoadingImg(false)
			console.error('Error uploading image:', error)
		}
	}

	//Profile sections render handling

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
			<main className='profile-page '>
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
					<section className='relative py-16 bg-gray-100 dark:bg-gray-800 dark:text-gray-200  '>
						<div className='container mx-auto px-4 '>
							<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-700 w-full mb-6 shadow-lg rounded-lg -mt-64'>
								<div className='px-6'>
									<div className='flex flex-wrap justify-center'>
										<div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center '>
											<input
												className=''
												type='file'
												accept='image/*'
												ref={fileInputRef}
												onChange={handleImageChange}
												style={{ display: 'none' }}
											/>
											{isCurrentUser ? (
												<>
													{loadingImg ? (
														<FadeLoader
															color={'#00a8e8'}
															loading={loading}
															css={override}
															size={50}
														/>
													) : (
														<>
															<img
																alt='...'
																src={userData?.profilePicture}
																className='shadow-xl z-10 rounded-full h-40 w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 cursor-pointer object-cover fade-in-2'
																onClick={handleImageClick}
															/>
															<div
																onClick={handleImageClick}
																className='group shadow-xl bg-transparent z-10 
													hover:bg-white hover:bg-opacity-40 rounded-full h-40 w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 cursor-pointer object-cover fade-in-2 transition-all duration-300'>
																<svg
																	className='h-12 w-12 group-hover:text-white text-transparent transition-all duration-300'
																	fill='none'
																	viewBox='0 0 24 24'
																	stroke='currentColor'>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		strokeWidth='2'
																		d='M12 6v6m0 0v6m0-6h6m-6 0H6'
																	/>
																</svg>
															</div>
														</>
													)}
												</>
											) : (
												<img
													alt='...'
													src={userData?.profilePicture}
													className='shadow-xl z-10 rounded-full h-40 w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16  object-cover fade-in-2'
												/>
											)}
										</div>
										<div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
											<div className='py-6 px-3 mt-32 sm:mt-0'>
												{!showSettings && (
													<div className='py-6 px-3 mt-32 sm:mt-0'>
														<button
															onClick={handleShowSettings}
															className='bg-sky-500 hover:bg-sky-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 fade-in-2'
															type='button'>
															Settings
														</button>
													</div>
												)}
											</div>
										</div>

										<div className='w-full lg:w-4/12 px-4 lg:order-1 fade-in-2 '>
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
