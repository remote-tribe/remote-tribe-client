import { GetCurrentUser } from '../Auth'
import { useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const HomePage = () => {
	const { loggedUser, setLoggedUser } = useContext(UserContext)

	useEffect(() => {
		const currentUser = GetCurrentUser()
		setLoggedUser(currentUser)
	}, [])
	return (
		<div>
			<h1 className='text-5xl mt-20 text-center'>Hello {loggedUser ? loggedUser.username : 'World'}</h1>
		</div>
	)
}
