import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { UserProfile } from '../components/UserProfile'
import { UserSettings } from '../components/UserSettings'
import { GetCurrentUser } from '../Auth'
import { AccountSettings } from '../components/AccountSettings'
import { useEffect, useState, useContext } from 'react'
import { ClipLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const ProfilePage = () => {
	const [loading, setLoading] = useState(true)
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
		setLoading(true)
		const token = localStorage.getItem('token')
		const fetchData = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/current`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				setLoading(false)
				setUserData(response.data)
			} catch (error) {
				setLoading(false)
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

	return loading ? (
		<div className='text-center text-sky-400 mt-20'>
			<ClipLoader
				color={'#00a8e8'}
				loading={loading}
				css={override}
				size={150}
			/>
		</div>
	) : (
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
