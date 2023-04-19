import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { UserProfile } from '../components/UserProfile'
import { Conversation } from '../components/Conversation'
import { GetCurrentUser } from '../Auth'
import { FadeLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const UserPage = () => {
	const [loading, setLoading] = useState(true)
	const [showConversation, setShowConversation] = useState(false)
	const [userData, setUserData] = useState(null)
	const { userId } = useParams()
	const currentUser = GetCurrentUser()

	const fetchUser = async () => {
		setLoading(true)
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user?userId=${userId}`)
			setLoading(false)
			setUserData(response.data)
		} catch (error) {
			setLoading(false)
			console.error(error)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	return loading ? (
		<div className='text-center text-sky-400 flex justify-center mt-60 '>
			<FadeLoader
				color={'#00a8e8'}
				loading={loading}
				css={override}
				size={150}
			/>
		</div>
	) : (
		<UserProfile
			userData={userData}
			currentUser={currentUser}
			conversation={setShowConversation}
		/>
	)
}
