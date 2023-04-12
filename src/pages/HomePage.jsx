import { GetCurrentUser } from '../Auth'
import { useState, useEffect } from 'react'

export const HomePage = () => {
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		const currentUser = GetCurrentUser()
		setUserData(currentUser)
	}, [])
	return (
		<div>
			<h1 className='text-5xl mt-20 text-center'>Hello {userData ? userData.username : 'World'}</h1>
		</div>
	)
}
