import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export const UserProfile = ({ userData, currentUser }) => {
	const isCurrentUser = userData?._id === currentUser?.id
	const token = localStorage.getItem('token')
	const navigate = useNavigate()
	const [currentUserFollowing, setCurrentUserFollowing] = useState([])
	const [isFollowing, setIsFollowing] = useState(false)

	const handleMessage = () => {
		if (!token) {
			return navigate('/signin')
		} else navigate('/inbox', { state: { user: userData } })
	}

	const handleFollowUp = async () => {
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
			fetchCurrentUserFollowing()
			console.log(response.data.message)
		} catch (err) {
			console.error('Error updating user profile: ', err)
		}
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
	}, [currentUser])

	useEffect(() => {
		if (currentUserFollowing.includes(userData?._id)) {
			setIsFollowing(true)
		} else {
			setIsFollowing(false)
		}
	}, [currentUserFollowing, userData])

	return (
		<main className='profile-page'>
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

			{userData && (
				<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-100 w-full mb-6  rounded-lg -mt-64'>
					<div className='px-6'>
						<div className='flex flex-wrap justify-center'></div>

						<div className='text-center mt-12'>
							<h3 className='text-4xl font-semibold leading-normal mb-2 '>Hi {userData?.username}</h3>
							{userData.location && (
								<div className='text-sm leading-normal mt-10 mb-2 text-blueGray-400 font-bold uppercase'>
									<i className='fas fa-solid fa-location-dot text-sky-500 text-2xl mr-2'></i>
									{userData?.location?.city}
									{userData?.location?.city && userData?.location?.country && ','}{' '}
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
						<div className='mt-10 py-10 border-t border-blueGray-200 text-center'>
							<div className='flex flex-wrap justify-center'>
								<div className='w-full lg:w-9/12 px-4'>
									<p className='mb-4 text-lg leading-relaxed text-blueGray-700'>{userData?.description}</p>
								</div>
							</div>
						</div>
						<div className=' p-3 text-center '>
							<span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
								{!isCurrentUser && (
									<>
										{isFollowing ? (
											<button
												onClick={handleUnfollow}
												className='bg-transparent text-rose-400 border-none hover:text-rose-600 text-blueGray-400 font-bold text-xm ease-linear transition-all duration-150'
												type='button'>
												Unfollow
											</button>
										) : (
											<button
												onClick={handleFollowUp}
												className='bg-transparent text-sky-400 border-none hover:text-sky-600 text-blueGray-400 font-bold text-xm ease-linear transition-all duration-150'
												type='button'>
												Follow
											</button>
										)}
									</>
								)}
							</span>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}
