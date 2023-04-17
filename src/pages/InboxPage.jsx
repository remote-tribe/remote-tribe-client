import { Conversation } from '../components/Conversation'
import { GetCurrentUser } from '../Auth'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const InboxPage = () => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userData, setUserData] = useState(null)
	const { id: userId } = GetCurrentUser()

	const fetchCurrentUser = async () => {
		try {
			const response = await axios.get(`http://localhost:5005/api/user?userId=${userId}`)
			setCurrentUser(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	const fetchUser = async (userId) => {
		try {
			const response = await axios.get(`http://localhost:5005/api/user?userId=${userId}`)
			setUserData(response.data)
			console.log(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchCurrentUser()
	}, [])

	return (
		<main className='flex w-full h-[94vh] shadow-lg rounded-3xl'>
			<section className='flex flex-col pt-3 w-4/12 bg-gray-50 h-full overflow-y-scroll'>
				<label className='px-3'>
					<input
						className='rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full'
						placeholder='Search...'
					/>
				</label>

				<ul className='mt-6'>
					{currentUser?.conversations?.map((conversation, index) => {
						const otherParticipant = conversation.participants.find(
							(participant) => participant._id !== userId,
						)
						return (
							<li
								onClick={() => fetchUser(otherParticipant?._id)}
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
