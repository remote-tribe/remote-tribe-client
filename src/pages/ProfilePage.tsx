import { useRef, useEffect, useState, useContext } from 'react'
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

interface UserData {
	username: string
	_id: string
	id: string
	email: string
	profilePicture: string
	followers: object[]
	following: object[]
	articles: object[]
	profession: string
	description: string
	location: { country: string; city: string }
}

export const ProfilePage = () => {
	const [loading, setLoading] = useState(true)
	const [userData, setUserData] = useState<UserData>({} as UserData)
	const [loadingImg, setLoadingImg] = useState(false)
	const [showSettings, setShowSettings] = useState(false)
	const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(null)
	const [showFollowing, SetShowFollowing] = useState(false)
	const [showFollowers, SetShowFollowers] = useState(false)
	const [uploadedImageURL, setUploadedImageURL] = useState('')
	const [showAccountSettings, setShowAccountSettings] = useState(false)
	const [showArticlesSettings, setShowArticlesSettings] = useState(false)

	const fileInputRef: any = useRef(null)
	const currentUser = GetCurrentUser() as UserData
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
			if (axios.isAxiosError(error) && error.response?.status === 401) {
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
		fileInputRef.current?.click()
	}

	const handleImageChange = async (e: any) => {
		try {
			const selectedImage = e.target.files[0]

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

	const handleImageUpload = async (image: any) => {
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
			<main className='profile-page '>
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
					<section className='relative bg-gray-100 py-16 dark:bg-gray-800 dark:text-gray-200  '>
						<div className='container mx-auto px-4 '>
							<div className='relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg dark:bg-slate-700'>
								<div className='px-6'>
									<div className='flex flex-wrap justify-center'>
										<div className='flex w-full justify-center px-4 lg:order-2 lg:w-3/12 '>
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
																className='fade-in-2 absolute z-10 -m-16 -ml-20 h-40 w-40 cursor-pointer rounded-full border-none object-cover align-middle shadow-xl lg:-ml-16'
																onClick={handleImageClick}
															/>
															<div
																onClick={handleImageClick}
																className='fade-in-2 group absolute z-10 
													-m-16 -ml-20 h-40 w-40 cursor-pointer rounded-full border-none bg-transparent object-cover align-middle shadow-xl transition-all duration-300 hover:bg-white hover:bg-opacity-40 lg:-ml-16'>
																<svg
																	className='h-12 w-12 text-transparent transition-all duration-300 group-hover:text-white'
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
													className='fade-in-2 absolute z-10 -m-16 -ml-20 h-40 w-40 rounded-full border-none object-cover align-middle  shadow-xl lg:-ml-16'
												/>
											)}
										</div>
										<div className='w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right'>
											<div className='mt-32 px-3 py-6 sm:mt-0'>
												{!showSettings && (
													<div className='mt-32 px-3 py-6 sm:mt-0'>
														<button
															onClick={handleShowSettings}
															className='fade-in-2 mb-1 rounded bg-sky-500 px-10 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2'
															type='button'>
															Settings
														</button>
													</div>
												)}
											</div>
										</div>

										<div className='fade-in-2 w-full px-4 lg:order-1 lg:w-4/12 '>
											<div className='flex justify-center py-4 pt-8 lg:pt-4'>
												<div className='p-3 text-center lg:mr-4'>
													<Link
														to={''}
														className=' block text-xl font-bold uppercase tracking-wide  '>
														<button
															onClick={handleShowFollowersSettings}
															className='border-none bg-transparent text-2xl font-bold text-sky-500  transition-all duration-150 ease-linear hover:text-sky-700 dark:text-sky-400'
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
															className='border-none bg-transparent text-2xl font-bold text-sky-500  transition-all duration-150 ease-linear hover:text-sky-700 dark:text-sky-400'
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
															className='border-none bg-transparent text-2xl font-bold text-sky-500  transition-all duration-150 ease-linear hover:text-sky-700 dark:text-sky-400'
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
											userData={userData}
											handleShowArticlesSettings={handleShowArticlesSettings}
										/>
									)}

									{showFollowing && <UserFollowing userData={userData} />}

									{showFollowers && <UserFollowers userData={userData} />}

									{!showSettings &&
										!showAccountSettings &&
										!showArticlesSettings &&
										!showFollowers &&
										!showFollowing && <UserProfile userData={userData} />}
								</div>
							</div>
						</div>
					</section>
				)}
			</main>
		</>
	)
}
