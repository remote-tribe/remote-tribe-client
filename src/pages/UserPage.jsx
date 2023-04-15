import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../components/UserProfile'
import { SendMessage } from '../components/SendMessage'
import { GetCurrentUser } from '../Auth'

export const UserPage = () => {
	const [showSendMessage, setShowSendMessage] = useState(false)
	const [userData, setUserData] = useState(null)
	const { userId } = useParams()
	const currentUser = GetCurrentUser()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.get(`http://localhost:5005/api/user?userId=${userId}`)
				setUserData(response.data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchUser()
	}, [])

	return showSendMessage ? (
		<SendMessage
			userData={userData}
			currentUser={currentUser}
			sendMessage={setShowSendMessage}
		/>
	) : (
		<UserProfile
			userData={userData}
			currentUser={currentUser}
			sendMessage={setShowSendMessage}
		/>
	)
}
