import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

interface UserData {
	username: string
	_id: any
	profilePicture: string
	followers: object[]
	following: object[]
	articles: object[]
	profession: string
	description: string
	location: { country: string; city: string }
}

export const UserFollowers = ({ userData }: { userData: UserData }) => {
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

			setUserFollowers(response.data)
		} catch (err) {
			console.error('Error fetching following users: ', err)
		}
	}

	useEffect(() => {
		fetchFollowingUsers()
	}, [])

	return (
		<div className='fade-in-2 flex w-full justify-center'>
			{userFollowers && (
				<table className='my-8 w-3/4 text-center text-2xl  '>
					<thead className='h-16'>
						<tr className='bg-gray-100 shadow dark:bg-slate-800 '>
							<th className='w-1/4'>
								<i className='fa-sharp fa-solid fa-image text-2xl text-sky-500'></i>
							</th>
							<th className='w-1/4'>
								<i className='fa-solid fa-user text-2xl text-sky-500'></i>
							</th>
							<th className='w-1/4'>
								<i className='fa-solid fa-briefcase  text-2xl text-sky-500 '></i>
							</th>
							<th className='w-1/4'>
								<i className='fas fa-solid fa-location-dot text-2xl text-sky-500 '></i>
							</th>
						</tr>
					</thead>
					<tbody>
						{userFollowers?.map((user: UserData, index) => (
							<tr
								key={index}
								className='m-2 h-12 rounded-md shadow dark:shadow-slate-800'>
								<td className='w-1/4 dark:bg-slate-600'>
									<Link to={`/users/${user?._id}`}>
										{' '}
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
								<td className='w-1/4 dark:bg-slate-600'>
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
