import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import React, { useRef } from 'react'
import axios from 'axios'
export const UserProfile = ({ userData, currentUser, handleShowSettings, handleShowArticlesSettings, conversation }) => {
	const isCurrentUser = userData?._id === currentUser?.id
	const token = localStorage.getItem('token')
	const navigate = useNavigate()
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

	const handleMessage = () => {
		if (!token) {
			return navigate('/signin')
		} else navigate('/inbox', { state: { user: userData } })
	}

	return (
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
				<section className='relative py-16 bg-gray-100 dark:bg-gray-900 '>
					<div className='container mx-auto px-4 '>
						<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-100 w-full mb-6 shadow-lg rounded-lg -mt-64'>
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
												className='shadow-xl rounded-full h-40 w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 cursor-pointer object-cover'
												onClick={handleImageClick}
											/>
										) : (
											<img
												alt='...'
												src={userData?.profilePicture}
												className='shadow-xl rounded-full h-40 w-40 align-middle border-none absolute -m-16 -ml-20 lg:-ml-16  object-cover'
											/>
										)}
									</div>
									<div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
										<div className='py-6 px-3 mt-32 sm:mt-0'>
											{isCurrentUser ? (
												<>
													<div className='py-6 px-3 mt-32 sm:mt-0'>
														<button
															onClick={handleShowSettings}
															className='bg-sky-500 hover:bg-sky-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '
															type='button'>
															Settings
														</button>
													</div>
												</>
											) : (
												<>
													<div className='py-6 px-3 mt-32 sm:mt-0'>
														<button
															onClick={handleMessage}
															className='bg-sky-600 hover:bg-sky-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '
															type='button'>
															Message
														</button>
													</div>
												</>
											)}
										</div>
									</div>

									<div className='w-full lg:w-4/12 px-4 lg:order-1'>
										<div className='flex justify-center py-4 lg:pt-4 pt-8'>
											<div className='lg:mr-4 p-3 text-center'>
												<Link to={''}>
													<span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600 '>
														<button
															onClick={handleShowArticlesSettings}
															className='bg-sky-500 hover:bg-sky-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '
															type='button'>
															{userData.friends?.length}
														</button>

													</span>
													<span className='text-sm text-blueGray-400'>Friends</span>
												</Link>
											</div>
											<div className='mr-4 p-3 text-center'>
												<span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
													{userData.articles?.length}
												</span>
												<span className='text-sm text-blueGray-400'>Articles</span>
											</div>
											<div className='mr-4 p-3 text-center'>
												<Link to={''}>
													<span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
														{userData.events?.length}
													</span>
													<span className='text-sm text-blueGray-400'>Events</span>
												</Link>
											</div>
										</div>
									</div>
								</div>

								<div className='text-center mt-12'>
									<h3 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700 '>
										{userData.username}
									</h3>
									{userData.location && (
										<div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
											{userData.location?.city}
											{userData.location.city && userData.location.country && ','}{' '}
											{userData.location?.country}
										</div>
									)}
									<div className='mb-2 text-lg text-blueGray-600 font-medium mt-10'>
										{userData.profession && (
											<div className='mb-2 text-lg text-blueGray-600 font-medium mt-10'>
												<Link
													to={``}
													className='transition-all font-normal text-blueGray-500 hover:text-sky-400'>
													{' '}
													{userData.profession}
												</Link>
											</div>
										)}
									</div>
								</div>
								<div className='mt-10 py-10 border-t border-blueGray-200 text-center'>
									<div className='flex flex-wrap justify-center'>
										<div className='w-full lg:w-9/12 px-4'>
											<p className='mb-4 text-lg leading-relaxed text-blueGray-700'>{userData.description}</p>
											<Link
												to={''}
												className='font-normal text-sky-400 cursor-pointer'>
												Show more
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</main>
	)
}
