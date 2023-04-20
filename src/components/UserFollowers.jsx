import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const UserFollowers = ({ userData, currentUser, handleShowFollowersSettings }) => {
    const navigate = useNavigate()

    return (
        <div className='mx-auto'>
            {userData && (
                <div className='flex flex-wrap mx-auto my-6 justify-center space-x-12 w-10/12'>
                    {userData.following?.map((following, index) => (
                        <Link
                            to={`/community/article/${article?._id}`}
                            key={index}
                            className='w-96 h-96 flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all duration-150'>

                        </Link>
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
