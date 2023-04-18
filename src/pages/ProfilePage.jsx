import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { UserProfile } from '../components/UserProfile'
import { UserSettings } from '../components/UserSettings'
import { GetCurrentUser } from '../Auth'
import { AccountSettings } from '../components/AccountSettings'
import { useEffect, useState, useContext } from 'react'

export const ProfilePage = () => {
	const { handleLogout } = useContext(UserContext)
	const currentUser = GetCurrentUser()
	const [userData, setUserData] = useState(null)
	const [showSettings, setShowSettings] = useState(false)
	const [showAccountSettings, setShowAccountSettings] = useState('false')

	const handleShowSettings = () => {
		setShowSettings(!showSettings)
	}
	const handleShowAccountSettings = () => {
		setShowAccountSettings(!showAccountSettings)
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		const fetchData = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/current`, {
					headers: { Authorization: `Bearer ${token}` },
				})

				setUserData(response.data)
			} catch (error) {
				console.log(error.message)
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
				showAccountSettings ? (
					<UserSettings
						userData={userData}
						handleShowSettings={handleShowSettings}
						handleShowAccountSettings={handleShowAccountSettings}
					/>
				) : (
					<AccountSettings
						userData={userData}
						handleShowAccountSettings={handleShowAccountSettings}
					/>
				)
			) : (
				<UserProfile
					currentUser={currentUser}
					userData={userData}
					handleShowSettings={handleShowSettings}
				/>
			)}
		</>
	)
}
