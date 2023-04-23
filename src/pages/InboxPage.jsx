import { Conversation } from '../components/Conversation'
import { GetCurrentUser } from '../Auth'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const InboxPage = () => {
	const [searchQuery, setSearchQuery] = useState('')
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
	const [showChats, setShowChats] = useState(true)

	const fetchCurrentUser = async () => {
		setUserData(null)
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
		if (window.innerWidth < 768) {
			setShowChats(false)
		}
		try {
			if (location) {
				setUserData(location?.state?.user)
			}
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user?userId=${userId}`)
			setUserData(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (location?.state) {
			setUserData(location?.state?.user)
			fetchUser(location?.state?.user?._id)
		}
		fetchCurrentUser()
	}, [])

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
		<main className='flex h-[94vh] w-full flex-col rounded-3xl md:flex-row '>
			<section className='flex flex-col bg-gray-200 py-3 scrollbar dark:bg-gray-700 md:h-full md:w-4/12 '>
				<label className='px-3'>
					<input
						onClick={() => setShowChats(!showChats)}
						className='w-full rounded-lg bg-white p-2 shadow ring-sky-400 transition duration-200 focus:outline-none focus:ring-2 dark:bg-gray-600 dark:text-gray-100 md:p-4'
						placeholder='Search...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</label>
				{showChats && (
					<ul className='pt-2 md:pt-6'>
						{currentUser?.conversations
							.filter((conversation) =>
								conversation.participants.some((participant) =>
									participant.username.toLowerCase().includes(searchQuery.toLowerCase()),
								),
							)
							.map((conversation, index) => {
								const otherParticipant = conversation.participants.find(
									(participant) => participant._id !== userId,
								)
								return (
									<li
										onClick={() => {
											fetchUser(otherParticipant?._id)
										}}
										key={index}
										className='cursor-pointer border-t border-gray-300 px-3 py-5 transition hover:bg-sky-100 dark:border-gray-600 dark:hover:bg-sky-900'>
										<span
											href='#'
											className='flex items-center justify-between'>
											<h3 className='text-lg font-semibold text-sky-500 dark:text-sky-400'>
												{otherParticipant?.username}
											</h3>
										</span>
										<div className='text-md italic text-gray-400'>Sent you a message!</div>
									</li>
								)
							})}
					</ul>
				)}
			</section>
			<Conversation
				setShowChats={setShowChats}
				currentUser={currentUser}
				userData={userData}
				fetchUser={fetchUser}
				fetchCurrentUser={fetchCurrentUser}
			/>
		</main>
	)
}
