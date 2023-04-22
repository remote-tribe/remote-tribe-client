import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const UserFollowing = ({ userData, currentUser, handleShowFollowingSettings }) => {
	const navigate = useNavigate()
	const [followingUsers, setFollowingUsers] = useState([])

	const fetchFollowingUsers = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/api/user/${userData?._id}/following-users`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)

			setFollowingUsers(response.data.followingUsers)
		} catch (err) {
			console.error('Error fetching following users: ', err)
		}
	}

	useEffect(() => {
		fetchFollowingUsers()
	}, [])

	return (
		<div className='flex w-full justify-center'>
			{followingUsers && (
				<table class='my-8 w-3/4 text-center text-2xl  '>
					<thead className='h-16'>
						<tr className='bg-gray-100 shadow dark:bg-slate-800 '>
							<th className='w-1/4'>
								<i class='fa-sharp fa-solid fa-image text-2xl text-sky-500'></i>
							</th>
							<th className='w-1/4'>
								<i class='fa-solid fa-user text-2xl text-sky-500'></i>
							</th>
							<th className='w-1/4'>
								<i class='fa-solid fa-briefcase  text-2xl text-sky-500 '></i>
							</th>
							<th className='w-1/4'>
								<i className='fas fa-solid fa-location-dot text-2xl text-sky-500 '></i>
							</th>
						</tr>
					</thead>
					<tbody>
						{followingUsers?.map((user, index) => (
							<tr
								key={index}
								className='m-2 h-12 rounded-md shadow dark:shadow-slate-800'>
								<td className='w-1/4 dark:bg-slate-600'>
									<Link to={`/users/${user?._id}`}>
										<img
											src={user?.profilePicture}
											className='mx-auto h-8 w-8 rounded-full'
										/>
									</Link>
								</td>
								<td className='w-1/4 dark:bg-slate-600'>
									<Link
										to={`/users/${user?._id}`}
										className='text-sky-500 transition-all duration-150 hover:text-sky-600 '>
										{user?.username}
									</Link>
								</td>
								<td className='w-1/4  dark:bg-slate-600'>
									<p className='text-gray-600 dark:text-gray-300'>{user?.profession}</p>
								</td>
								<td className='w-1/4 dark:bg-slate-600'>
									<span className='dark:text-gray-300'>
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
