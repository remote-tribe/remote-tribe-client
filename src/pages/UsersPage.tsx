import axios from 'axios'
import { Link } from 'react-router-dom'
import { GetCurrentUser } from '../Auth'
import { useState, useEffect } from 'react'
import { FadeLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

interface UserData {
	id: string
	_id: string
	username: string
}

export const UsersPage = () => {
	const currentUser = GetCurrentUser() as UserData
	const currentUserId = currentUser?.id
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)

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

	const filteredUsers = users.filter((user: UserData) => user?._id !== currentUserId)

	return loading ? (
		<div className='mt-60 flex justify-center text-center text-sky-400 '>
			<FadeLoader
				color={'#00a8e8'}
				loading={loading}
				css={override}
				size={150}
			/>
		</div>
	) : (
		<div className='mx-auto mt-10 flex flex-col items-center space-y-2 sm:max-w-md'>
			{filteredUsers?.map((user: UserData, index) => (
				<Link
					to={`/users/${user._id}`}
					key={index}
					className='w-full rounded bg-white text-center text-3xl shadow '>
					{user?.username}
				</Link>
			))}
		</div>
	)
}
