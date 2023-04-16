import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { GetCurrentUser } from '../Auth'

export const UsersPage = () => {
	const [users, setUsers] = useState([])
	const { id: currentUserId } = GetCurrentUser()

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await axios.get('http://localhost:5005/api/users')
			console.log(response.data)
			setUsers(response.data)
		}
		fetchUsers()
	}, [])

	const filteredUsers = users.filter((user) => user._id !== currentUserId)

	return (
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