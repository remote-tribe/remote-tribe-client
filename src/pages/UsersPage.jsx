import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { GetCurrentUser } from '../Auth'
import { FadeLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const UsersPage = () => {
	const [loading, setLoading] = useState(true)
	const [users, setUsers] = useState([])
	const currentUser = GetCurrentUser()
	const currentUserId = currentUser?.id

	useEffect(() => {
		setLoading(true)
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`)
				setLoading(false)
				setUsers(response.data)
			} catch (error) {
				setLoading(false)
				console.log(error)
			}
		}
		fetchUsers()
	}, [])

	const filteredUsers = users.filter((user) => user?._id !== currentUserId)

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
		<div className='flex flex-col items-center sm:max-w-md mx-auto space-y-2 mt-10'>
			{filteredUsers?.map((user, index) => (
				<Link
					to={`/users/${user._id}`}
					key={index}
					className='text-center text-3xl bg-white shadow w-full rounded '>
					{user?.username}
				</Link>
			))}
		</div>
	)
}
