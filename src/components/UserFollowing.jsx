import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserFollowing = ({ userData, currentUser, handleShowFollowingSettings }) => {
    const navigate = useNavigate()
    const [followingUsers, setFollowingUsers] = useState([])

    const fetchFollowingUsers = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/user/${currentUser?.id}/following-users`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
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
        <div className='mx-auto'>
            {followingUsers && (
                <div className='flex flex-wrap mx-auto my-6 justify-center space-x-12 w-10/12'>
                    <ul className='space-y-4'>
                        {followingUsers.map((user, index) => (
                            <li key={index} className='flex items-center'>
                                <Link
                                    to={`/users/${user?._id}`} // 根据你的路由设置进行调整
                                    className='hover:text-blue-600 transition-all duration-150'>
                                    <h3>{user.username}</h3>
                                </Link>
                                <span className='mx-4 text-gray-600'>{user.location.city}, {user.location.country}</span>
                                <span className='text-gray-600'>{user.profession}</span>
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-wrap mx-auto my-6 justify-center space-x-12 w-10/12'>
                        <button
                            onClick={handleShowFollowingSettings}
                            className=' font-normal text-sky-400 cursor-pointer'>
                            back
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserFollowing
