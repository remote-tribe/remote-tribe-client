import { NavLink } from 'react-router-dom'
import { Logout } from '../Auth'
import { GetCurrentUser } from '../Auth'
import { UserContext } from '../context/UserContext'
import { useEffect, useState, useContext } from 'react'
import { themeSwitch } from '../main'

export const NavBar = () => {
	const { loggedUser } = useContext(UserContext)
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		const currentUser = GetCurrentUser()

		setUserData(currentUser)
	}, [loggedUser])

	return (
		<div className='bg-white dark:bg-gray-800 shadow p-0 m-0'>
			<div className='flex items-center justify-between py-2 px-6'>
				<div className='mr-10'>
					<NavLink to='/'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-10 h-10 text-sky-500 dark:text-sky-400'
							viewBox='0 0 24 24'>
							<path
								fill='currentColor'
								d='m 24 12 c 0 -0.002 0 -0.004 0 -0.006 c 0 -3.551 -1.546 -6.74 -4.001 -8.933 l -0.012 -0.01 c -0.031 -0.033 -0.064 -0.062 -0.101 -0.087 l -0.002 -0.001 c -2.095 -1.84 -4.859 -2.962 -7.886 -2.962 c -3.032 0 -5.8 1.126 -7.91 2.984 l 0.013 -0.011 c -0.026 0.02 -0.049 0.041 -0.07 0.065 v 0.001 c -2.478 2.205 -4.031 5.403 -4.031 8.963 c 0 3.55 1.544 6.739 3.997 8.933 l 0.012 0.01 c 0 0.003 0.002 0.005 0.005 0.005 c 0.031 0.035 0.065 0.065 0.101 0.092 l 0.002 0.001 c 2.094 1.837 4.857 2.958 7.881 2.958 c 3.032 0 5.801 -1.126 7.911 -2.984 l -0.013 0.011 c 0.03 -0.022 0.056 -0.045 0.08 -0.07 c 2.475 -2.202 4.026 -5.395 4.026 -8.951 c 0 -0.002 0 -0.005 0 -0.007 Z m -4.462 7.805 c -0.576 -0.468 -1.223 -0.897 -1.909 -1.262 l -0.065 -0.032 c 0.613 -1.767 0.982 -3.804 1.017 -5.923 v -0.016 h 4.261 c -0.156 2.852 -1.391 5.388 -3.301 7.23 Z m -6.966 -1.505 c 1.283 0.069 2.482 0.351 3.588 0.81 l -0.072 -0.026 c -0.886 2.02 -2.133 3.408 -3.516 3.713 Z m 0 -1.144 v -4.584 h 4.868 c -0.043 1.961 -0.383 3.828 -0.976 5.578 l 0.039 -0.131 c -1.157 -0.484 -2.498 -0.795 -3.903 -0.862 l -0.027 -0.001 Z m 0 -5.728 v -4.584 c 1.431 -0.069 2.772 -0.379 4.007 -0.891 l -0.079 0.029 c 0.555 1.619 0.896 3.485 0.94 5.425 v 0.021 Z m 0 -5.728 v -4.495 c 1.383 0.305 2.63 1.687 3.516 3.713 c -1.034 0.43 -2.233 0.711 -3.487 0.781 Z m 2.854 -4 c 1.238 0.419 2.312 1.009 3.258 1.752 l -0.023 -0.018 c -0.443 0.348 -0.94 0.676 -1.464 0.961 l -0.056 0.028 c -0.449 -1.047 -1.025 -1.947 -1.724 -2.737 l 0.009 0.011 Z m -4 -0.492 v 4.492 c -1.283 -0.069 -2.482 -0.35 -3.588 -0.81 l 0.072 0.026 c 0.89 -2.02 2.135 -3.407 3.518 -3.712 Z m -4.568 3.212 c -0.58 -0.315 -1.077 -0.642 -1.544 -1.007 l 0.024 0.018 c 0.923 -0.726 1.996 -1.315 3.158 -1.712 l 0.076 -0.023 c -0.689 0.778 -1.265 1.678 -1.689 2.658 l -0.025 0.065 Z m 4.57 2.423 v 4.584 h -4.868 c 0.044 -1.961 0.385 -3.827 0.979 -5.577 l -0.039 0.131 c 1.156 0.483 2.497 0.794 3.901 0.861 Z m 0 5.728 v 4.584 c -1.431 0.069 -2.772 0.379 -4.007 0.891 l 0.079 -0.029 c -0.555 -1.618 -0.896 -3.485 -0.94 -5.425 v -0.021 Z m 0 5.728 v 4.495 c -1.383 -0.305 -2.63 -1.687 -3.516 -3.713 c 1.034 -0.43 2.233 -0.71 3.487 -0.78 l 0.029 -0.001 Z m -2.85 4 c -1.238 -0.418 -2.311 -1.006 -3.258 -1.748 l 0.024 0.018 c 0.443 -0.348 0.94 -0.676 1.464 -0.961 l 0.056 -0.028 c 0.445 1.047 1.022 1.947 1.723 2.733 l -0.009 -0.01 Z m 8.564 -2.72 c 0.58 0.315 1.077 0.642 1.544 1.007 l -0.024 -0.018 c -0.923 0.726 -1.996 1.315 -3.158 1.712 l -0.076 0.023 c 0.689 -0.778 1.265 -1.677 1.689 -2.657 l 0.025 -0.065 Z m 5.7 -8.151 h -4.261 c -0.035 -2.135 -0.404 -4.172 -1.058 -6.078 l 0.041 0.138 c 0.751 -0.399 1.397 -0.828 1.997 -1.312 l -0.024 0.018 c 1.913 1.845 3.148 4.381 3.303 7.205 l 0.001 0.028 Z m -18.38 -7.233 c 0.576 0.468 1.223 0.897 1.909 1.262 l 0.065 0.032 c -0.613 1.767 -0.982 3.804 -1.017 5.923 v 0.016 h -4.262 c 0.156 -2.852 1.391 -5.388 3.301 -7.23 l 0.003 -0.003 Z m -3.304 8.377 h 4.261 c 0.035 2.135 0.404 4.172 1.058 6.078 l -0.041 -0.138 c -0.751 0.399 -1.397 0.828 -1.997 1.312 l 0.024 -0.018 c -1.913 -1.845 -3.148 -4.381 -3.303 -7.205 l -0.001 -0.028 Z'
							/>
						</svg>
					</NavLink>
				</div>

				<div className='hidden sm:flex sm:items-center flex-1'>
					<NavLink
						to='/community'
						className='dark:hover:text-sky-400 text-gray-800 dark:text-gray-400 text-lg font-semibold hover:text-sky-400 mx-4'>
						Community
					</NavLink>

					<NavLink
						to='/users'
						className='dark:hover:text-sky-400 text-gray-800 dark:text-gray-400 text-lg font-semibold hover:text-sky-400 mx-4'>
						Users
					</NavLink>
				</div>
				<p
					onClick={themeSwitch}
					className='moon-icon hidden group  items-center text-gray-600 hover:text-sky-600 font-medium dark:text-gray-400 dark:hover:text-sky-500 cursor-pointer'>
					<svg
						className='w-5 h-5'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 16 16'>
						<path d='M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z' />
					</svg>
				</p>
				<p
					onClick={themeSwitch}
					className='sun-icon mr-7 group  items-center text-gray-600 hover:text-sky-400 font-medium dark:text-gray-400 dark:hover:text-sky-300 cursor-pointer'>
					<svg
						className='w-5 h-5'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 16 16'>
						<path d='M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z' />
					</svg>
				</p>

				<div className='hidden sm:flex sm:items-center'>
					{userData ? (
						<>
							<NavLink
								to={`/profile`}
								className='dark:hover:text-sky-300 text-gray-800 dark:text-gray-400 text-lg font-semibold hover:text-sky-500 mx-4'>
								{userData.username}
							</NavLink>
							<NavLink
								onClick={Logout}
								to=''
								className='dark:hover:text-sky-300 text-gray-800 dark:text-gray-400 text-lg font-semibold hover:text-sky-500 mx-4'>
								Sign Out
							</NavLink>
						</>
					) : (
						<NavLink
							to='/signin'
							className='dark:hover:text-sky-300 text-gray-800 dark:text-gray-400 text-lg font-semibold hover:text-sky-500 mx-4'>
							Sign in
						</NavLink>
					)}
				</div>

				<div className='sm:hidden cursor-pointer'>
					<NavLink to='/'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-6 h-6 text-sky-500'
							viewBox='0 0 24 24'>
							<path
								fill='currentColor'
								d='M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z'
							/>
						</svg>
					</NavLink>
				</div>
			</div>
			<div className='block sm:hidden bg-white dark:bg-gray-800 border-t-2 dark:border-gray-700 py-2'>
				<div className='flex items-center'>
					<NavLink
						to='/community'
						className='text-gray-800 dark:text-gray-300 text-lg font-semibold hover:text-sky-500 dark:hover:text-sky-300 mb-1 mx-auto'>
						Community
					</NavLink>
				</div>
				<div className='flex items-center'>
					<NavLink
						to='/users'
						className='text-gray-800 dark:text-gray-300 text-lg font-semibold hover:text-sky-500 dark:hover:text-sky-300 mb-1 mx-auto'>
						Users
					</NavLink>
				</div>
				<div className='flex justify-evenly items-center border-t-2 dark:border-gray-700 py-3'>
					{userData ? (
						<>
							<NavLink
								to='/profile'
								className='dark:hover:text-sky-300 text-gray-800 dark:text-gray-400 text-lg font-semibold hover:text-sky-500 mx-4'>
								{userData.username}
							</NavLink>
							<NavLink
								to=''
								onClick={Logout}
								className='dark:hover:text-sky-300 text-gray-800 dark:text-gray-400 text-lg font-semibold hover:text-sky-500 mx-4'>
								Sign Out
							</NavLink>
						</>
					) : (
						<>
							<NavLink
								to='/signin'
								className='dark:hover:text-sky-300 text-gray-800 dark:text-gray-400 text-lg font-semibold hover:text-sky-500 mx-4'>
								Sign in
							</NavLink>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
