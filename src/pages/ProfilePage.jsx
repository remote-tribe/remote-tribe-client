import { GetCurrentUser } from '../Auth'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { UserProfile } from '../components/UserProfile'
import { UserSettings } from '../components/UserSettings'

export const ProfilePage = () => {
	const [userData, setUserData] = useState(null)
	const [showSettings, setShowSettings] = useState(false)

	const handleShowSettings = () => {
		setShowSettings(!showSettings)
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		const currentUser = GetCurrentUser()
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:5005/api/users/current`, {
					headers: { Authorization: `Bearer ${token}` },
				})

				setUserData(response.data)
			} catch (error) {
				if (error.message.includes('401')) {
					handleLogout()
				}
				console.log(error)
			}
		}

		if (token && currentUser) {
			fetchData()
		}
	}, [showSettings])

	return (
		<>
			{showSettings ? (
				<UserSettings
					userData={userData}
					handleShowSettings={handleShowSettings}
				/>
			) : (
				<UserProfile
					userData={userData}
					handleShowSettings={handleShowSettings}
				/>
			)}
		</>
	)
}
