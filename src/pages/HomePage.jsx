import { GetCurrentUser } from '../Auth'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { ClipLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const HomePage = () => {
	const [loading, setLoading] = useState(true)
	const { loggedUser, setLoggedUser } = useContext(UserContext)

	useEffect(() => {
		const currentUser = GetCurrentUser()
		setLoggedUser(currentUser)
		setLoading(false)
	}, [])

	return (
		<div>
			{loading ? (
				<div className='text-center mt-20'>
					<ClipLoader
						color={'#00a8e8'}
						loading={loading}
						css={override}
						size={150}
					/>
				</div>
			) : (
				<h1 className='text-gray-800 dark:text-gray-200 text-5xl mt-20 text-center'>
					Hello {loggedUser ? loggedUser.username : 'World'}
				</h1>
			)}
		</div>
	)
}
