import { useState, useEffect, FormEventHandler } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ReportModal } from './ReportModal'

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
	conversations: object[]
	location: { country: string; city: string }
}

interface Conversation {
	participants: UserData[]
	_id: string
	messages: []
}

const Conversation = ({
	userData,
	currentUser,
	fetchUser,
	fetchCurrentUser,
	setShowChats,
}: {
	userData: UserData | null
	currentUser: UserData | null
	fetchUser: Function
	fetchCurrentUser: Function
	setShowChats: Function
}) => {
	const [chat, setChat] = useState<Conversation>({
		participants: [],
		_id: '',
		messages: [],
	})

	const [message, setMessage] = useState('')
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [reportModalOpen, setReportModalOpen] = useState<any>(false)
	const [notification, setNotification] = useState(null)
	const [error, setError] = useState('')

	// Local storage token and navigation
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	// Toggle menu open/close state
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	// Delete conversation
	const deleteConversation = async (e: any) => {
		e.preventDefault()
		const id = chat?._id

		try {
			await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/conversation?conversationId=${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			navigate(location.pathname, {})
			fetchCurrentUser()
		} catch (error) {
			console.log(error)
		}
	}

	// Get conversation data
	useEffect(() => {
		const conversation = userData?.conversations?.find((conversation: any) => {
			return conversation?.participants?.some((participant: UserData) => {
				return participant._id === currentUser?._id
			})
		})

		setChat(conversation as Conversation)
	}, [userData, currentUser])

	// Handle message submission
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		try {
			await axios.post(
				`${import.meta.env.VITE_BASE_URL}/api/conversation`,
				{
					senderId: currentUser?._id,
					recipientId: userData?._id,
					message,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			fetchUser(userData?._id)
			setMessage('')
		} catch (error) {
			console.log(error)
		}
	}

	// Close report modal
	const closeReportModal = () => {
		setReportModalOpen(false)
	}

	// Handle report submission
	const handleReport = async (report: string, id: string) => {
		closeReportModal()

		if (report == '') {
			setError('Text field cannot be empty.')
			setTimeout(() => {
				setError('')
			}, 5000)
			return
		}

		try {
			const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/report`, {
				content: report,
				id: id,
			})
			setNotification(response?.data?.message)
			setTimeout(() => {
				setNotification(null)
			}, 5000)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div
			className='h-full w-full   '
			onClick={() => isMenuOpen && setIsMenuOpen(false)}>
			<div className='  h-full bg-gradient-to-br from-sky-500 to-transparent shadow-lg '>
				{userData && (
					<div
						onClick={() => {
							if (window.innerWidth < 768) {
								setShowChats(false)
							}
						}}
						className='p:2 last fade-in-2 flex h-full flex-1 flex-col justify-between  sm:p-6  '>
						{reportModalOpen && (
							<ReportModal
								handleReport={handleReport}
								isOpen={reportModalOpen}
								closeModal={closeReportModal}
							/>
						)}
						<div className='flex justify-between border-b border-sky-300 py-3 dark:border-sky-500 sm:items-center'>
							<Link
								to={`/users/${userData?._id}`}
								className='relative ml-2 flex cursor-pointer items-center space-x-4 md:ml-0 '>
								<img
									src={userData?.profilePicture}
									alt=''
									className='h-10 w-10 rounded-full sm:h-16 sm:w-16'
								/>

								<div className='flex flex-col leading-tight text-white transition-all duration-150 hover:text-sky-700 dark:text-white dark:hover:text-sky-900 '>
									<div className='mt-1 flex items-center text-2xl '>
										<span className=' mr-3  '>{userData?.username}</span>
									</div>
									<span className='dark:hover:white text-lg text-white hover:text-white dark:hover:text-white '>
										{userData?.profession}
									</span>
								</div>
							</Link>
							<div className='relative'>
								<button
									type='button'
									onClick={toggleMenu}
									className='mr-4 inline-flex h-8 w-8 scale-125 items-center justify-center rounded-full text-sky-700 transition duration-500 ease-in-out focus:outline-none hover:bg-sky-200 dark:text-sky-500 dark:hover:bg-sky-900'>
									<i className='fa-solid fa-ellipsis-vertical'></i>
								</button>
								{isMenuOpen && (
									<div className='absolute right-0 mt-2  w-48  shadow-lg'>
										<Link
											to={`/users/${userData?._id}`}
											className='text-md block w-full bg-white px-4 py-3 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-700'>
											View Profile
										</Link>
										<button
											onClick={() => setReportModalOpen(chat?._id)}
											className='text-md block w-full border-b  bg-white px-4 py-3 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-700'>
											Report
										</button>

										<button
											onClick={deleteConversation}
											className='text-md block w-full bg-white px-4 py-3 text-left text-rose-500 hover:bg-gray-100  dark:bg-gray-600 dark:hover:bg-gray-700'>
											Delete Conversation
										</button>
									</div>
								)}
							</div>
						</div>
						{notification && (
							<div
								className='fade-in-2 relative mx-auto my-3 w-fit rounded border border-green-400 bg-green-100 px-8 py-3 text-green-700 dark:border-green-700 dark:bg-green-500 dark:text-white'
								role='alert'>
								<span className='block sm:inline'>{notification}</span>
							</div>
						)}
						{error && (
							<div
								className='fade-in-2 relative mx-auto my-3 w-fit rounded border border-red-400 bg-red-100 px-8 py-3 text-red-700 dark:border-red-700 dark:bg-red-500 dark:text-white'
								role='alert'>
								<span className='block sm:inline'>{error}</span>
							</div>
						)}
						<div
							id='messages'
							className='scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex h-full flex-col space-y-4 overflow-y-auto p-3'>
							{chat?.messages?.map((message: { sender: string; message: string }, index: number) => (
								<div
									key={index}
									className='chat-message'>
									{message?.sender === currentUser?._id ? (
										<div className='flex items-end'>
											<div className='text-md order-2 mx-2 flex max-w-xs flex-col items-start space-y-2'>
												<div>
													<span className='inline-block rounded-lg rounded-br-none bg-sky-600 px-4 py-2 text-white dark:bg-sky-700 '>
														{message?.message}
													</span>
												</div>
											</div>
											<img
												src={currentUser?.profilePicture}
												alt='My profile'
												className='order-1 h-6 w-6 rounded-full'
											/>
										</div>
									) : (
										<div className='flex items-end justify-end'>
											<div className='text-md order-1 mx-2 flex max-w-xs flex-col items-end space-y-2'>
												<div>
													<span className='inline-block rounded-lg rounded-bl-none bg-gray-200 px-4 py-2 text-gray-600 dark:bg-gray-500 dark:text-gray-50'>
														{message?.message}
													</span>
												</div>
											</div>
											<img
												src={userData?.profilePicture}
												alt='My profile'
												className='order-1 h-6 w-6 rounded-full'
											/>
										</div>
									)}
								</div>
							))}
						</div>
						<form onSubmit={handleSubmit}>
							<div className=' border-gray-200 px-4 pb-6 pt-4 sm:mb-0 md:pb-0 '>
								<div className='relative flex transition-all duration-150  '>
									<span className='absolute inset-y-0 flex items-center'>
										<button
											type='button'
											className='inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out  focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-500'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6 text-gray-600 dark:text-gray-400'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'></path>
											</svg>
										</button>
									</span>

									<input
										type='text'
										placeholder='Write your message!'
										className='w-full rounded-lg bg-gray-200 py-3 pl-12  text-gray-600 placeholder-gray-600 outline-none transition-all duration-150   focus:outline-none dark:bg-gray-600 dark:text-gray-200 dark:placeholder-gray-400'
										id='message'
										name='message'
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
									<div className='absolute inset-y-0 right-0  items-center rounded-lg sm:flex'>
										<button
											type='button'
											className='hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-500 sm:inline-flex'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6 text-gray-600 dark:text-gray-400'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'></path>
											</svg>
										</button>
										<button
											type='button'
											className='hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-500 sm:inline-flex'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6 text-gray-600 dark:text-gray-400'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'></path>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'></path>
											</svg>
										</button>
										<button
											type='button'
											className='hidden h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-500 sm:inline-flex '>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6 text-gray-600 dark:text-gray-400'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
											</svg>
										</button>
										<button
											type='submit'
											className='inline-flex items-center justify-center rounded-e-lg bg-sky-600 px-4 py-3 text-white transition duration-500 ease-in-out focus:outline-none hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700'>
											<span className='font-bold'>Send</span>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'
												className='ml-2 h-6 w-6 rotate-90 transform'>
												<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
											</svg>
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	)
}

export default Conversation
