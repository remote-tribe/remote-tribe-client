import { Conversation } from '../components/Conversation'
import { GetCurrentUser } from '../Auth'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const InboxPage = () => {
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	if (!token) {
		navigate('/signin')
	}
	const [currentUser, setCurrentUser] = useState(null)
	const [userData, setUserData] = useState(null)
	const currUser = GetCurrentUser()
	const userId = currUser?.id
	const location = useLocation()

	const fetchCurrentUser = async () => {
		setLoading(true)
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user?userId=${userId}`)
			setLoading(false)
			setCurrentUser(response.data)
		} catch (error) {
			setLoading(false)
			console.error(error)
		}
	}

	const fetchUser = async (userId) => {
		try {
			if (location) {
				setUserData(location?.state?.user)
			}
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user?userId=${userId}`)
			setUserData(response.data)
			console.log(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (location) {
			setUserData(location?.state?.user)
			fetchUser(location?.state?.user?._id)
		}
		fetchCurrentUser()
	}, [])

	return loading ? (
		<div className='text-center text-sky-400 mt-20'>
			<ClipLoader
				color={'#00a8e8'}
				loading={loading}
				css={override}
				size={150}
			/>
		</div>
	) : (
		<main className='flex w-full h-[94vh] shadow-lg rounded-3xl'>
			<section className='flex flex-col pt-3 w-4/12 bg-gray-50 h-full overflow-y-scroll'>
				<label className='px-3'>
					<input
						className='rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full'
						placeholder='Search...'
					/>
				</label>

				<ul className='mt-6'>
					{location?.state?.user && (
						<li
							onClick={() => fetchUser(location?.state?.user?._id)}
							className='py-5 cursor-pointer border-b px-3 transition hover:bg-sky-100'>
							<span
								href='#'
								className='flex justify-between items-center'>
								<h3 className='text-lg font-semibold text-sky-500'>{location?.state?.user?.username}</h3>
								<p className='text-md text-gray-400'>23m ago</p>
							</span>
							<div className='text-md italic text-gray-400'>Sent you a message!</div>
						</li>
					)}
					{currentUser?.conversations?.map((conversation, index) => {
						const otherParticipant = conversation.participants.find(
							(participant) => participant._id !== userId,
						)
						return (
							<li
								onClick={() => {
									fetchUser(otherParticipant?._id)
								}}
								key={index}
								className='py-5 cursor-pointer border-b px-3 transition hover:bg-sky-100'>
								<span
									href='#'
									className='flex justify-between items-center'>
									<h3 className='text-lg font-semibold text-sky-500'>{otherParticipant?.username}</h3>
									<p className='text-md text-gray-400'>23m ago</p>
								</span>
								<div className='text-md italic text-gray-400'>Sent you a message!</div>
							</li>
						)
					})}
				</ul>
			</section>
			<Conversation
				currentUser={currentUser}
				userData={userData}
				fetchUser={fetchUser}
				fetchCurrentUser={fetchCurrentUser}
			/>
		</main>
	)
}
