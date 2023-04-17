import { useState, useEffect } from 'react'
import axios from 'axios'

export const Conversation = ({ userData, currentUser, fetchUser, fetchCurrentUser }) => {
	const [chat, setChat] = useState([])
	const [message, setMessage] = useState('')

	useEffect(() => {
		const conversation = userData?.conversations?.find((conversation) => {
			return conversation?.participants?.some((participant) => {
				return participant._id === currentUser?._id
			})
		})

		if (conversation) {
			setChat(conversation)
		}
	}, [userData])

	const handleSubmit = async (e) => {
		const token = localStorage.getItem('token')
		e.preventDefault()
		try {
			const response = await axios.post(
				`http://localhost:5005/api/conversation`,
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
			console.log(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='w-full h-full  '>
			<div className='  bg-white dark:bg-gray-800 rounded-lg h-full'>
				{userData && (
					<div className='flex-1 p:2 sm:p-6 justify-between last flex flex-col h-full '>
						<div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
							<div className='relative flex items-center space-x-4'>
								<div className='relative'>
									<img
										src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
										alt=''
										className='w-10 sm:w-16 h-10 sm:h-16 rounded-full'
									/>
								</div>
								<div className='flex flex-col leading-tight'>
									<div className='text-2xl mt-1 flex items-center'>
										<span className='text-gray-700 mr-3'>{userData?.username}</span>
									</div>
									<span className='text-lg text-gray-600'>{userData?.profession}</span>
								</div>
							</div>
							<div className='flex items-center space-x-2'>
								<button
									type='button'
									className='inline-flex items-center justify-center rounded-full  h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none mr-4 scale-125'>
									<i className='fa-solid fa-ellipsis-vertical'></i>
								</button>
							</div>
						</div>
						<div
							id='messages'
							className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-full'>
							{chat?.messages?.map((message, index) => (
								<div
									key={index}
									className='chat-message'>
									{message?.sender === currentUser?._id ? (
										<div className='flex items-end'>
											<div className='flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start'>
												<div>
													<span className='px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white '>
														{message?.message}
													</span>
												</div>
											</div>
											<img
												src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
												alt='My profile'
												className='w-6 h-6 rounded-full order-1'
											/>
										</div>
									) : (
										<div className='flex items-end justify-end'>
											<div className='flex flex-col space-y-2 text-md max-w-xs mx-2 order-1 items-end'>
												<div>
													<span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600'>
														{message?.message}
													</span>
												</div>
											</div>
											<img
												src='https://images.unsplash.com/photo-1587397845856-e6cf49176c70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
												alt='My profile'
												className='w-6 h-6 rounded-full order-1'
											/>
										</div>
									)}
								</div>
							))}
						</div>
						<form onSubmit={handleSubmit}>
							<div className=' border-gray-200 px-4 pt-4 mb-2 sm:mb-0 '>
								<div className='relative flex transition-all duration-150  '>
									<span className='absolute inset-y-0 flex items-center'>
										<button
											type='button'
											className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6 text-gray-600'>
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
										className='w-full focus:outline-none focus:placeholder-sky-600 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-lg  py-3 transition-all duration-150 outline-none'
										id='message'
										name='message'
										value={message}
										onChange={(e) => setMessage(e.target.value)}
									/>
									<div className='absolute right-0 items-center inset-y-0 hidden sm:flex rounded-lg'>
										<button
											type='button'
											className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6 text-gray-600'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'></path>
											</svg>
										</button>
										<button
											type='button'
											className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6 text-gray-600'>
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
											className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												className='h-6 w-6 text-gray-600'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
											</svg>
										</button>
										<button
											type='submit'
											className='inline-flex items-center justify-center rounded-e-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-sky-500 hover:bg-sky-600 focus:outline-none'>
											<span className='font-bold'>Send</span>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 20 20'
												fill='currentColor'
												className='h-6 w-6 ml-2 transform rotate-90'>
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
