import { GetCurrentUser } from '../Auth'
import { useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const HomePage = () => {
	const { loggedUser, setLoggedUser } = useContext(UserContext)
	console.log(import.meta.env.VITE_BASE_URL)

	useEffect(() => {
		const currentUser = GetCurrentUser()
		setLoggedUser(currentUser)
	}, [])
	return (
		<div>
			<h1 className='text-gray-800 dark:text-gray-200 text-5xl mt-20 text-center'>
				Hello {loggedUser ? loggedUser.username : 'World'}
			</h1>
		</div>
	)
}
