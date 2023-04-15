import { useState } from 'react'
import axios from 'axios'

export const SendMessage = ({ userData, currentUser, sendMessage }) => {
	const [message, setMessage] = useState('')

	const handleSubmit = async (e) => {
		const token = localStorage.getItem('token')
		e.preventDefault()
		try {
			const response = await axios.post(
				`http://localhost:5005/api/conversation`,
				{
					senderId: currentUser?.id,
					recipientId: userData?._id,
					message,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			sendMessage()
			console.log(response.data)
			setMessage('')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form className=' mx-auto p-4 w-6/12'>
			<div className='mb-4 flex flex-col items-center mt-20'>
				<label
					htmlFor='message'
					className='block text-gray-700 font-semibold mb-4 text-xl'>
					Message to {userData?.username}
				</label>
				<textarea
					id='message'
					name='message'
					className='border-gray-300 border rounded w-full  py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 resize-none h-40'
					placeholder='Type your message here...'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>

				<button
					type='submit'
					className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-1 px-6 rounded transition-all duration-150 mt-4'
					onClick={handleSubmit}>
					Send
				</button>
			</div>
		</form>
	)
}
