import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const UserFollowers = ({ userData, currentUser, handleShowFollowersSettings }) => {
	const navigate = useNavigate()

	const [userFollowers, setUserFollowers] = useState([])

	const fetchFollowingUsers = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/api/user/${userData?._id}/followers`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			console.log(response.data)
			setUserFollowers(response.data)
		} catch (err) {
			console.error('Error fetching following users: ', err)
		}
	}

	useEffect(() => {
		fetchFollowingUsers()
	}, [])

	return (
		<div className='w-full flex justify-center'>
			{userFollowers && (
				<table class='my-8 text-2xl w-3/4 text-center  '>
					<thead className='h-16'>
						<tr className='shadow bg-gray-100 '>
							<th className='w-1/4'>
								<i class='fa-sharp fa-solid fa-image text-sky-500 text-2xl'></i>
							</th>
							<th className='w-1/4'>
								<i class='fa-solid fa-user text-sky-500 text-2xl'></i>
							</th>
							<th className='w-1/4'>
								<i class='fa-solid fa-briefcase  text-sky-500 text-2xl '></i>
							</th>
							<th className='w-1/4'>
								<i className='fas fa-solid fa-location-dot text-sky-500 text-2xl '></i>
							</th>
						</tr>
					</thead>
					<tbody>
						{userFollowers?.map((user, index) => (
							<tr
								key={index}
								className='shadow m-2 rounded-md h-12'>
								<td className='w-1/4'>
									<img
										src={user?.profilePicture}
										className='h-8 w-8 rounded-full mx-auto'
									/>
								</td>
								<td className='w-1/4'>
									<Link
										to={`/users/${user?._id}`}
										className='text-sky-500 hover:text-sky-600 transition-all duration-150 '>
										{user?.username}
									</Link>
								</td>
								<td className='w-1/4'>
									<p className='text-gray-600'>{user?.profession}</p>
								</td>
								<td className='w-1/4'>
									<span>
										{user?.location?.city}
										{user?.location?.city && user?.location?.country && ', '}
										{user?.location?.country}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default UserFollowers
