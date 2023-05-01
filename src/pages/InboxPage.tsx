import axios from 'axios'
import { GetCurrentUser } from '../Auth'
import { FadeLoader } from 'react-spinners'
import { useState, useEffect, lazy, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

interface UserData {
	username: string
	id: string
	_id: string
	profilePicture: string
	followers: object[]
	following: object[]
	articles: object[]
	profession: string
	description: string
	conversations: [{ participants: [] }]
	location: { country: string; city: string }
}

const Conversation = lazy(() => import('../components/Conversation'))

const InboxPage = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	if (!token) {
		navigate('/signin')
	}
	const [currentUser, setCurrentUser] = useState<UserData | null>(null)
	const [userData, setUserData] = useState(null)
	const currUser = GetCurrentUser() as UserData
	const userId = currUser?.id
	const location = useLocation()
	const [showChats, setShowChats] = useState(true)

	const fetchCurrentUser = useCallback(async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user?userId=${userId}`)
			setCurrentUser(response.data)
			setLoading(false)
		} catch (error) {
			console.error(error)
			setLoading(false)
		}
	}, [userId])

	const fetchUser = useCallback(async (userId: string) => {
		if (window.innerWidth < 768) {
			setShowChats(false)
		}
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user?userId=${userId}`)
			setUserData(response.data)
		} catch (error) {
			console.error(error)
		}
	}, [])

	useEffect(() => {
		if (location?.state) {
			setUserData(location?.state?.user)
			fetchUser(location?.state?.user?._id)
		}
		fetchCurrentUser()
	}, [location?.state, fetchCurrentUser, fetchUser])

	const filteredConversations = useMemo(() => {
		return currentUser?.conversations
			.filter((conversation) =>
				conversation.participants.some((participant: { username: string }) =>
					participant.username.toLowerCase().includes(searchQuery.toLowerCase()),
				),
			)
			.reverse()
	}, [currentUser?.conversations, searchQuery])

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
						onClick={() => {
							if (window.innerWidth < 768) {
								setShowChats(!showChats)
							} else setShowChats(true)
						}}
						className='w-full rounded-lg bg-white p-2 shadow ring-sky-400 transition duration-200 focus:outline-none focus:ring-2 dark:bg-gray-600 dark:text-gray-100 md:p-4'
						placeholder='Search...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</label>
				{showChats && (
					<ul className='pt-2 md:pt-6'>
						{filteredConversations?.map((conversation, index) => {
							const otherParticipant: UserData = conversation.participants.find(
								(participant: UserData) => participant._id !== userId,
							) || {
								username: '',
								id: '',
								_id: '',
								profilePicture: '',
								followers: [],
								following: [],
								articles: [],
								profession: '',
								description: '',
								conversations: [{ participants: [] }],
								location: { country: '', city: '' },
							}
							return (
								<li
									onClick={() => {
										fetchUser(otherParticipant?._id)
									}}
									key={index}
									className='cursor-pointer border-t border-gray-300 px-3 py-5 transition hover:bg-sky-100 dark:border-gray-600 dark:hover:bg-sky-900'>
									<span className='flex items-center justify-between'>
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

export default InboxPage
