import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const AccountSettings = ({ userData, handleShowAccountSettings }) => {
	const [newEmail, setNewEmail] = useState('')
	const [password, setPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [showVerify, setShowVerify] = useState(true)
	const [showButtons, setShowButtons] = useState(true)
	const [currentEmail, setCurrentEmail] = useState('')
	const [showEmailInputs, setShowEmailInputs] = useState(false)
	const [confirmedPassword, setConfirmedPassword] = useState('')
	const [showPasswordInputs, setShowPasswordInputs] = useState(false)

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
				<section className='relative bg-white py-16 dark:bg-slate-700 '>
					<div className='container mx-auto px-4 '>
						<div className='relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white  dark:bg-slate-700 dark:text-gray-200 '>
							<Link
								onClick={handleShowAccountSettings}
								className=' absolute -right-12 -top-36 ml-auto  mr-10 cursor-pointer text-xl text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-500'>
								User Settings
							</Link>
							<div className='px-6'>
								<div className='flex flex-wrap justify-center'>
									<div className='w-full px-4 lg:order-3 lg:w-full lg:self-center lg:text-right'>
										<h1 className='my-4  text-center text-3xl font-semibold text-gray-800 dark:text-gray-200'>
											Account Settings
										</h1>

										<form
											className='text-lg'
											onSubmit={verifyPass}>
											<div className='mb-4 flex flex-col items-center '>
												<label
													className='mb-2 block font-normal text-gray-700 dark:text-gray-300'
													htmlFor='password'>
													To continue, please enter your password:
												</label>
												<input
													className='text-md w-1/5 cursor-pointer rounded border border-gray-300 px-4 py-2 text-center  leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-slate-800 dark:text-gray-300'
													id='password'
													type='password'
													placeholder='Password'
													name='password'
													onChange={(e) => setPassword(e.target.value)}
												/>
											</div>

											<div className='flex items-center justify-center pb-10 pt-8'>
												<button
													type='submit'
													className='text-md mb-1 w-40 rounded bg-sky-500 py-1 font-normal uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2 '>
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
				<section className='relative bg-white py-4 dark:bg-slate-700  '>
					<div className='container mx-auto px-4 '>
						<div className='relative  -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg  bg-white dark:bg-slate-700 '>
							<h2
								onClick={handleShowAccountSettings}
								className=' absolute -right-12 -top-24 ml-auto mr-10 cursor-pointer  text-xl text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-500 '>
								User Settings
							</h2>
							<div className='px-6'>
								<div className='flex flex-wrap justify-center'>
									<div className='w-full px-4 lg:order-3 lg:w-full lg:self-center lg:text-right'>
										<h1 className='text-center text-3xl  font-semibold text-gray-800 dark:text-gray-200 '>
											Account Settings
										</h1>

										{showEmailInputs && (
											<form
												className='text-lg '
												onSubmit={handleEmailSubmit}>
												<div className='flex flex-col items-center'>
													<label
														className='mb-4 mt-6 text-xl font-semibold text-gray-500 dark:text-gray-300'
														htmlFor='current-email'>
														Change Email
													</label>
													<input
														className='text-md mb-4 w-1/5 cursor-pointer rounded border border-gray-300 px-4 py-2  text-center leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-slate-800 dark:text-gray-300'
														type='email'
														name='currentEmail'
														id='currentEmail'
														placeholder='Current Email'
														value={currentEmail}
														onChange={(e) => setCurrentEmail(e.target.value)}
													/>

													<input
														className='text-md mb-2 w-1/5 cursor-pointer rounded border border-gray-300 px-4 py-2  text-center leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-slate-800 dark:text-gray-300'
														placeholder='New Email'
														type='email'
														name='newEmail'
														id='newEmail'
														value={newEmail}
														onChange={(e) => setNewEmail(e.target.value)}
													/>

													<input
														className='text-md mb-2 w-1/5 cursor-pointer rounded border border-gray-300 px-4 py-2  text-center leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-slate-800 dark:text-gray-300 '
														placeholder='Password'
														type='password'
														name='password'
														id='password'
														value={password}
														onChange={(e) => setPassword(e.target.value)}
													/>
													<div className='flex items-center justify-center pb-10 pt-8'>
														<button
															type='submit'
															className='text-md mb-1 w-40 rounded bg-sky-500 py-1 font-normal uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2 '>
															Submit
														</button>
														<button
															onClick={handleChangeEmailClick}
															type='button'
															className='text-md mb-1 w-40 rounded bg-gray-500 py-1 font-normal uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-gray-600 hover:shadow-md sm:mr-2 '>
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
														className='mb-4 mt-6 text-xl font-semibold text-gray-500 dark:text-gray-300'
														htmlFor='current-password'>
														Change Password
													</label>
													<input
														className='text-md mb-4 w-1/5 cursor-pointer rounded border border-gray-300 px-4 py-2  text-center leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-slate-800 dark:text-gray-300'
														type='password'
														placeholder='Old Password'
														id='current-password'
														value={password}
														name='password'
														onChange={(e) => setPassword(e.target.value)}
													/>

													<input
														className='text-md mb-2 w-1/5 cursor-pointer rounded border border-gray-300 px-4 py-2  text-center leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-slate-800 dark:text-gray-300'
														type='password'
														placeholder='New Password'
														id='new-password'
														name='newPassword'
														value={newPassword}
														onChange={(e) => setNewPassword(e.target.value)}
													/>

													<input
														className='text-md mb-2 w-1/5 cursor-pointer rounded border border-gray-300 px-4 py-2  text-center leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-slate-800 dark:text-gray-300'
														placeholder='Confirm New Password'
														type='password'
														name='confirmedPassword'
														id='confirmedPassword'
														value={confirmedPassword}
														onChange={(e) => setConfirmedPassword(e.target.value)}
													/>
													<div className='flex items-center justify-center pb-10 pt-8'>
														<button
															type='submit'
															className='text-md mb-1 w-40 rounded bg-sky-500 py-1 font-normal uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2 '>
															Submit
														</button>
														<button
															onClick={handleChangePasswordClick}
															type='button'
															className='text-md mb-1 w-40 rounded bg-gray-500 py-1 font-normal uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-gray-600 hover:shadow-md sm:mr-2 '>
															Cancel
														</button>
													</div>
												</div>
											</form>
										)}
										{showButtons && (
											<div className='flex  items-center justify-center pb-10 pt-8'>
												<button
													type='button'
													onClick={handleChangeEmailClick}
													className='text-md mx-4 mb-1  mt-24 w-40 rounded bg-sky-500 py-1 font-semibold text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2'>
													Change Email
												</button>
												<button
													type='button'
													onClick={handleChangePasswordClick}
													className='text-md mx-4 mb-1  mt-24 w-40 rounded bg-sky-500 py-1 font-semibold text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2'>
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
