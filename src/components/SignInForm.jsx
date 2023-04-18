import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import { ClipLoader } from 'react-spinners'
import { UserContext } from '../context/UserContext'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const SignInForm = ({ handleShowRegister, message }) => {
	const navigate = useNavigate()
	const { handleLogin } = useContext(UserContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			const isLoggedIn = await handleLogin(email, password, rememberMe)
			if (isLoggedIn) {
				navigate('/')
			}
		} catch (error) {
			setError(error?.message)
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleRememberMeChange = (e) => {
		setRememberMe(e.target.checked)
	}

	return (
		<section className='pt-10  '>
			{message && (
				<div
					className='bg-green-100 dark:bg-green-400 dark:text-white border w-fit mx-auto border-green-400 dark:border-green-700 text-green-700 px-8 py-3 rounded relative my-3'
					role='alert'>
					<span className='block sm:inline'>{message}</span>
				</div>
			)}
			{error ? (
				<div
					className='bg-red-100 dark:bg-red-400 dark:text-red-100 border w-fit mx-auto border-red-400 dark:border-red-700 text-red-700 px-4 py-3 rounded relative my-3'
					role='alert'>
					<span className='block sm:inline'>{error}</span>
				</div>
			) : (
				<div className='h-[3.1rem] my-3'></div>
			)}
			<div className='flex flex-col items-center px-6 py-8 mx-auto md:h-full lg:py-0'>
				<Link
					to={'/'}
					className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='w-10 h-10 text-sky-500 mr-1'
						viewBox='0 0 24 24'>
						<path
							fill='currentColor'
							d='m 24 12 c 0 -0.002 0 -0.004 0 -0.006 c 0 -3.551 -1.546 -6.74 -4.001 -8.933 l -0.012 -0.01 c -0.031 -0.033 -0.064 -0.062 -0.101 -0.087 l -0.002 -0.001 c -2.095 -1.84 -4.859 -2.962 -7.886 -2.962 c -3.032 0 -5.8 1.126 -7.91 2.984 l 0.013 -0.011 c -0.026 0.02 -0.049 0.041 -0.07 0.065 v 0.001 c -2.478 2.205 -4.031 5.403 -4.031 8.963 c 0 3.55 1.544 6.739 3.997 8.933 l 0.012 0.01 c 0 0.003 0.002 0.005 0.005 0.005 c 0.031 0.035 0.065 0.065 0.101 0.092 l 0.002 0.001 c 2.094 1.837 4.857 2.958 7.881 2.958 c 3.032 0 5.801 -1.126 7.911 -2.984 l -0.013 0.011 c 0.03 -0.022 0.056 -0.045 0.08 -0.07 c 2.475 -2.202 4.026 -5.395 4.026 -8.951 c 0 -0.002 0 -0.005 0 -0.007 Z m -4.462 7.805 c -0.576 -0.468 -1.223 -0.897 -1.909 -1.262 l -0.065 -0.032 c 0.613 -1.767 0.982 -3.804 1.017 -5.923 v -0.016 h 4.261 c -0.156 2.852 -1.391 5.388 -3.301 7.23 Z m -6.966 -1.505 c 1.283 0.069 2.482 0.351 3.588 0.81 l -0.072 -0.026 c -0.886 2.02 -2.133 3.408 -3.516 3.713 Z m 0 -1.144 v -4.584 h 4.868 c -0.043 1.961 -0.383 3.828 -0.976 5.578 l 0.039 -0.131 c -1.157 -0.484 -2.498 -0.795 -3.903 -0.862 l -0.027 -0.001 Z m 0 -5.728 v -4.584 c 1.431 -0.069 2.772 -0.379 4.007 -0.891 l -0.079 0.029 c 0.555 1.619 0.896 3.485 0.94 5.425 v 0.021 Z m 0 -5.728 v -4.495 c 1.383 0.305 2.63 1.687 3.516 3.713 c -1.034 0.43 -2.233 0.711 -3.487 0.781 Z m 2.854 -4 c 1.238 0.419 2.312 1.009 3.258 1.752 l -0.023 -0.018 c -0.443 0.348 -0.94 0.676 -1.464 0.961 l -0.056 0.028 c -0.449 -1.047 -1.025 -1.947 -1.724 -2.737 l 0.009 0.011 Z m -4 -0.492 v 4.492 c -1.283 -0.069 -2.482 -0.35 -3.588 -0.81 l 0.072 0.026 c 0.89 -2.02 2.135 -3.407 3.518 -3.712 Z m -4.568 3.212 c -0.58 -0.315 -1.077 -0.642 -1.544 -1.007 l 0.024 0.018 c 0.923 -0.726 1.996 -1.315 3.158 -1.712 l 0.076 -0.023 c -0.689 0.778 -1.265 1.678 -1.689 2.658 l -0.025 0.065 Z m 4.57 2.423 v 4.584 h -4.868 c 0.044 -1.961 0.385 -3.827 0.979 -5.577 l -0.039 0.131 c 1.156 0.483 2.497 0.794 3.901 0.861 Z m 0 5.728 v 4.584 c -1.431 0.069 -2.772 0.379 -4.007 0.891 l 0.079 -0.029 c -0.555 -1.618 -0.896 -3.485 -0.94 -5.425 v -0.021 Z m 0 5.728 v 4.495 c -1.383 -0.305 -2.63 -1.687 -3.516 -3.713 c 1.034 -0.43 2.233 -0.71 3.487 -0.78 l 0.029 -0.001 Z m -2.85 4 c -1.238 -0.418 -2.311 -1.006 -3.258 -1.748 l 0.024 0.018 c 0.443 -0.348 0.94 -0.676 1.464 -0.961 l 0.056 -0.028 c 0.445 1.047 1.022 1.947 1.723 2.733 l -0.009 -0.01 Z m 8.564 -2.72 c 0.58 0.315 1.077 0.642 1.544 1.007 l -0.024 -0.018 c -0.923 0.726 -1.996 1.315 -3.158 1.712 l -0.076 0.023 c 0.689 -0.778 1.265 -1.677 1.689 -2.657 l 0.025 -0.065 Z m 5.7 -8.151 h -4.261 c -0.035 -2.135 -0.404 -4.172 -1.058 -6.078 l 0.041 0.138 c 0.751 -0.399 1.397 -0.828 1.997 -1.312 l -0.024 0.018 c 1.913 1.845 3.148 4.381 3.303 7.205 l 0.001 0.028 Z m -18.38 -7.233 c 0.576 0.468 1.223 0.897 1.909 1.262 l 0.065 0.032 c -0.613 1.767 -0.982 3.804 -1.017 5.923 v 0.016 h -4.262 c 0.156 -2.852 1.391 -5.388 3.301 -7.23 l 0.003 -0.003 Z m -3.304 8.377 h 4.261 c 0.035 2.135 0.404 4.172 1.058 6.078 l -0.041 -0.138 c -0.751 0.399 -1.397 0.828 -1.997 1.312 l 0.024 -0.018 c -1.913 -1.845 -3.148 -4.381 -3.303 -7.205 l -0.001 -0.028 Z'
						/>
					</svg>
					Remote Tribe
				</Link>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 '>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl text-center font-semibold mb-8 leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Sign In to your Account
						</h1>
						<form
							className='space-y-4 md:space-y-6'
							onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white'>
									Your Email
								</label>
								<input
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									type='text'
									name='email'
									id='email'
									className='bg-gray-50 text-gray-900 sm:text-sm rounded-lg 
									block w-full p-2.5 dark:bg-gray-700 focus:ring-2 ring-sky-400 dark:ring-sky-500	border-gray-300 dark:border-gray-600 border dark:placeholder-gray-400 dark:text-white outline-none mt-2 transition-all duration-150 focus:shadow-md'
								/>
							</div>
							<div>
								<label
									htmlFor='password'
									className=' text-center block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
									Your Password
								</label>
								<input
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									type='password'
									name='password'
									id='password'
									className='bg-gray-50 text-gray-900 sm:text-sm rounded-lg 
									block w-full p-2.5 dark:bg-gray-700 focus:ring-2 ring-sky-400 dark:ring-sky-500	border-gray-300 dark:border-gray-600 border dark:placeholder-gray-400 dark:text-white outline-none mt-2 transition-all duration-150 focus:shadow-md'
								/>
							</div>
							<div className='flex items-center justify-between'>
								<div className='flex items-start'>
									<div className='flex items-center h-5'>
										<input
											id='remember'
											aria-describedby='remember'
											type='checkbox'
											name='rememberMe'
											checked={rememberMe}
											onChange={handleRememberMeChange}
											className='cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300
                                     dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
										/>
									</div>
									<div className='ml-3 text-sm'>
										<label
											htmlFor='remember'
											className='text-gray-500 dark:text-gray-300'>
											Remember me
										</label>
									</div>
								</div>
								<Link
									onClick={() => setIsLoading(!isLoading)}
									to={'#'}
									className='text-sm font-medium text-sky-500 text-primary-600 hover:text-sky-600  dark:text-primary-500'>
									Forgot password?
								</Link>
							</div>
							{isLoading ? (
								<div className='flex justify-center '>
									<ClipLoader
										color='#00a8e8'
										css={override}
										size={48}
									/>
								</div>
							) : (
								<div className='h-12' />
							)}

							<div className='button-div'>
								<button
									type='submit'
									className='w-auto mx-auto flex text-sky-500 hover:text-sky-300 font-medium rounded-lg text-xl px-6 py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-sky-500 hover:border-sky-400 border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5'>
									Sign In
								</button>
							</div>

							<p className='text-sm text-center font-light text-gray-500 dark:text-gray-400'>
								Don’t have an account yet?
								<span
									onClick={handleShowRegister}
									className='font-medium text-primary-600 text-sky-500 text-lg hover:text-sky-600  dark:text-primary-500 ml-2 cursor-pointer transition-all duration-150'>
									Sign up
								</span>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
