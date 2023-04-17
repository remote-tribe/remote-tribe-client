import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../components/UserProfile'
import { Conversation } from '../components/Conversation'
import { GetCurrentUser } from '../Auth'

export const UserPage = () => {
	const [showConversation, setShowConversation] = useState(false)
	const [userData, setUserData] = useState(null)
	const { userId } = useParams()
	const currentUser = GetCurrentUser()

	const fetchUser = async () => {
		try {
			const response = await axios.get(`http://localhost:5005/api/user?userId=${userId}`)
			setUserData(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	return showConversation ? (
		<Conversation
			userData={userData}
			currentUser={currentUser}
			fetchUser={fetchUser}
		/>
	) : (
		<UserProfile
			userData={userData}
			currentUser={currentUser}
			conversation={setShowConversation}
		/>
	)
}
