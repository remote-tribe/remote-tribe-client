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
                `${import.meta.env.VITE_BASE_URL}/api/user/${currentUser?.id}/followers`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            console.log(response.data);
            setUserFollowers(response.data)
        } catch (err) {
            console.error('Error fetching following users: ', err)
        }
    }

    useEffect(() => {
        fetchFollowingUsers()
    }, [])


    return (
        <div className='mx-auto'>
            {userFollowers && (
                <div className='flex flex-wrap mx-auto my-6 justify-center space-x-12 w-10/12'>
                    {userFollowers?.map((user, index) => (
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

                    <div className='flex flex-wrap mx-auto my-6 justify-center space-x-12 w-10/12'>
                        <button
                            onClick={handleShowFollowersSettings}
                            className=' font-normal text-sky-400 cursor-pointer'>
                            back
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default UserFollowers
