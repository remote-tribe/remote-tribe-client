import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { UserProfile } from '../components/UserProfile'
import { UserSettings } from '../components/UserSettings'
import { GetCurrentUser } from '../Auth'
import { AccountSettings } from '../components/AccountSettings'
import UserArticles from '../components/UserArticles'
import { useEffect, useState, useContext } from 'react'


export const ProfilePage = () => {
	const { handleLogout } = useContext(UserContext)
	const currentUser = GetCurrentUser()
	const [userData, setUserData] = useState(null)
	const [showSettings, setShowSettings] = useState(false)
	const [showAccountSettings, setShowAccountSettings] = useState(false)
	const [showArticlesSettings, setShowArticlesSettings] = useState(false)
	const handleShowSettings = () => {
		setShowSettings(!showSettings)
	}
	const handleShowAccountSettings = () => {
		setShowAccountSettings(!showAccountSettings)
	}

	const handleShowArticlesSettings = () => {
		setShowArticlesSettings(!showArticlesSettings)
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
			{showAccountSettings && (
				<AccountSettings
					userData={userData}
					handleShowAccountSettings={handleShowAccountSettings}
				/>
			)}

			{showSettings && !showAccountSettings && (
				<UserSettings
					userData={userData}
					handleShowSettings={handleShowSettings}
					handleShowAccountSettings={handleShowAccountSettings}
				/>
			)}

			{showArticlesSettings && (
				<UserArticles
					currentUser={currentUser}
					userData={userData}
					handleShowArticlesSettings={handleShowArticlesSettings}
				/>
			)}

			{!showSettings && !showAccountSettings && !showArticlesSettings && (
				<UserProfile
					currentUser={currentUser}
					userData={userData}
					handleShowSettings={handleShowSettings}
					handleShowArticlesSettings={handleShowArticlesSettings}
				/>
			)}
		</>

	)
}
