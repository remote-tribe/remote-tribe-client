import { useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const AccountSettings = ({ userData, handleShowAccountSettings }) => {
	const [showEmailInputs, setShowEmailInputs] = useState(false)
	const [showPasswordInputs, setShowPasswordInputs] = useState(false)
	const [currentEmail, setCurrentEmail] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmedPassword, setConfirmedPassword] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showVerify, setShowVerify] = useState(true)
	const [showButtons, setShowButtons] = useState(true)

	const handleShowVerify = () => {
		setShowVerify(!showVerify)
	}

	const handleChangeEmailClick = () => {
		setShowEmailInputs(!showEmailInputs)
		setShowButtons(!showButtons)
	}

	const handleChangePasswordClick = () => {
		setShowPasswordInputs(!showPasswordInputs)
		setShowButtons(!showButtons)
	}

	const handleEmailSubmit = async (e) => {
		e.preventDefault()
		const token = localStorage.getItem('token')

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/auth/email`,
				{
					currentEmail,
					newEmail,
					password,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			if (response) {
				console.log(response.data)
				handleChangeEmailClick()
				setCurrentEmail('')
				setNewEmail('')
				setPassword('')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handlePasswordSubmit = async (e) => {
		e.preventDefault()
		const token = localStorage.getItem('token')

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/auth/password`,

				{
					userId: userData._id,
					password,
					newPassword,
					confirmedPassword,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			if (response) {
				handleChangePasswordClick()
				setPassword('')
				setNewPassword('')
				setConfirmedPassword('')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const verifyPass = async (e) => {
		e.preventDefault()
		const token = localStorage.getItem('token')

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/auth/verifyPass`,
				{
					email: userData.email,
					password,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			if (response) {
				console.log(response.data)
				setPassword('')
				handleShowVerify()
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<main className='profile-page '>
			<section className='relative block h-60'></section>
			{userData && showVerify ? (
				<section className='relative py-16 bg-white dark:bg-slate-700 '>
					<div className='container mx-auto px-4 '>
						<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-slate-700 dark:text-gray-200 w-full mb-6  rounded-lg -mt-64 '>
							<Link
								onClick={handleShowAccountSettings}
								className=' text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-500  text-xl absolute -top-36 -right-12 cursor-pointer ml-auto mr-10'>
								User Settings
							</Link>
							<div className='px-6'>
								<div className='flex flex-wrap justify-center'>
									<div className='w-full lg:w-full px-4 lg:order-3 lg:text-right lg:self-center'>
										<h1 className='text-center  text-gray-800 dark:text-gray-200 text-3xl font-semibold my-4'>
											Account Settings
										</h1>

										<form
											className='text-lg'
											onSubmit={verifyPass}>
											<div className='mb-4 flex flex-col items-center '>
												<label
													className='block text-gray-700 dark:text-gray-300 font-normal mb-2'
													htmlFor='password'>
													To continue, please enter your password:
												</label>
												<input
													className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 dark:bg-slate-800 dark:border-slate-600 dark:text-gray-300'
													id='password'
													type='password'
													placeholder='Password'
													name='password'
													onChange={(e) => setPassword(e.target.value)}
												/>
											</div>

											<div className='flex justify-center items-center pb-10 pt-8'>
												<button
													type='submit'
													className='bg-sky-500 hover:bg-sky-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
													Submit
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				<section className='relative py-4 bg-white dark:bg-slate-700  '>
					<div className='container mx-auto px-4 '>
						<div className='relative  flex flex-col min-w-0 break-words bg-white dark:bg-slate-700 w-full mb-6  rounded-lg -mt-64 '>
							<h2
								onClick={handleShowAccountSettings}
								className=' text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-500 text-xl absolute  -top-24 -right-12 cursor-pointer ml-auto mr-10 '>
								User Settings
							</h2>
							<div className='px-6'>
								<div className='flex flex-wrap justify-center'>
									<div className='w-full lg:w-full px-4 lg:order-3 lg:text-right lg:self-center'>
										<h1 className='text-center dark:text-gray-200  text-gray-800 text-3xl font-semibold '>
											Account Settings
										</h1>

										{showEmailInputs && (
											<form
												className='text-lg '
												onSubmit={handleEmailSubmit}>
												<div className='flex flex-col items-center'>
													<label
														className='text-xl text-gray-500 dark:text-gray-300 font-semibold mt-6 mb-4'
														htmlFor='current-email'>
														Change Email
													</label>
													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mb-4 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-600'
														type='email'
														name='currentEmail'
														id='currentEmail'
														placeholder='Current Email'
														value={currentEmail}
														onChange={(e) => setCurrentEmail(e.target.value)}
													/>

													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mb-2 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-600'
														placeholder='New Email'
														type='email'
														name='newEmail'
														id='newEmail'
														value={newEmail}
														onChange={(e) => setNewEmail(e.target.value)}
													/>

													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mb-2 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-600 '
														placeholder='Password'
														type='password'
														name='password'
														id='password'
														value={password}
														onChange={(e) => setPassword(e.target.value)}
													/>
													<div className='flex justify-center items-center pb-10 pt-8'>
														<button
															type='submit'
															className='bg-sky-500 hover:bg-sky-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
															Submit
														</button>
														<button
															onClick={handleChangeEmailClick}
															type='button'
															className='bg-gray-500 hover:bg-gray-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
															Cancel
														</button>
													</div>
												</div>
											</form>
										)}

										{showPasswordInputs && (
											<form
												className='text-lg '
												onSubmit={handlePasswordSubmit}>
												<div className='flex flex-col items-center'>
													<label
														className='text-xl text-gray-500 dark:text-gray-300 font-semibold mt-6 mb-4'
														htmlFor='current-password'>
														Change Password
													</label>
													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mb-4 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-600'
														type='password'
														placeholder='Old Password'
														id='current-password'
														value={password}
														name='password'
														onChange={(e) => setPassword(e.target.value)}
													/>

													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mb-2 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-600'
														type='password'
														placeholder='New Password'
														id='new-password'
														name='newPassword'
														value={newPassword}
														onChange={(e) => setNewPassword(e.target.value)}
													/>

													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mb-2 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-600'
														placeholder='Confirm New Password'
														type='password'
														name='confirmedPassword'
														id='confirmedPassword'
														value={confirmedPassword}
														onChange={(e) => setConfirmedPassword(e.target.value)}
													/>
													<div className='flex justify-center items-center pb-10 pt-8'>
														<button
															type='submit'
															className='bg-sky-500 hover:bg-sky-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
															Submit
														</button>
														<button
															onClick={handleChangePasswordClick}
															type='button'
															className='bg-gray-500 hover:bg-gray-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
															Cancel
														</button>
													</div>
												</div>
											</form>
										)}
										{showButtons && (
											<div className='flex  justify-center items-center pb-10 pt-8'>
												<button
													type='button'
													onClick={handleChangeEmailClick}
													className='bg-sky-500 hover:bg-sky-600 mx-4  text-white hover:shadow-md shadow text-md font-semibold w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mt-24'>
													Change Email
												</button>
												<button
													type='button'
													onClick={handleChangePasswordClick}
													className='bg-sky-500 hover:bg-sky-600 mx-4  text-white hover:shadow-md shadow text-md font-semibold w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 mt-24'>
													Change Password
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</main>
	)
}
