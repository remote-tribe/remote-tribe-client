import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

export const AccountSettings = ({ userData, handleShowAccountSettings }) => {
	const [showEmailInputs, setShowEmailInputs] = useState(false)
	const [showPasswordInputs, setShowPasswordInputs] = useState(false)
	const [currentEmail, setCurrentEmail] = useState('')
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmedPassword, setConfirmedPassword] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showVerify, setShowVerify] = useState(true)
	const { setLoggedUser } = useContext(UserContext)
	const [showButtons, setShowButtons] = useState(true)

	const handleChangeEmailClick = () => {
		setShowEmailInputs(true)
		setShowButtons(false)
	}

	const handleChangePasswordClick = () => {
		setShowPasswordInputs(true)
		setShowButtons(false)
	}

	const handleEmailSubmit = (e) => {
		e.preventDefault()
	}
	const handlePasswordSubmit = (e) => {
		e.preventDefault()
	}

	const handleShowVerify = () => {
		setShowVerify(!showVerify)
	}

	const verifyPass = async (e) => {
		e.preventDefault()
		const token = localStorage.getItem('token')

		try {
			const response = await axios.post(
				`http://localhost:5005/auth/verifyPass`,
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
			<section className='relative block h-80'>
				<div className='w-full h-full bg-center bg-cover'>
					<span
						id='blackOverlay'
						className='w-full h-full absolute opacity-50 dark:bg-sky-800 bg-sky-400'></span>
				</div>
				<div className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16'>
					<svg
						className='absolute bottom-0 overflow-hidden '
						xmlns='http://www.w3.org/2000/svg'
						preserveAspectRatio='none'
						version='1.1'
						viewBox='0 0 2560 100'
						x='0'
						y='0'></svg>
				</div>
			</section>
			{userData && showVerify ? (
				<section className='relative py-16 bg-gray-100 dark:bg-gray-900  '>
					<div className='container mx-auto px-4 '>
						<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-100 w-full mb-6 shadow-lg rounded-lg -mt-64 '>
							<h2
								onClick={handleShowAccountSettings}
								className=' text-sky-500 hover:text-sky-600 text-lg cursor-pointer ml-auto mr-10 mt-4'>
								User Settings
							</h2>
							<div className='px-6'>
								<div className='flex flex-wrap justify-center'>
									<div className='w-full lg:w-full px-4 lg:order-3 lg:text-right lg:self-center'>
										<h1 className='text-center  text-gray-800 text-3xl font-semibold my-4'>
											Account Settings
										</h1>

										<form
											className='text-lg'
											onSubmit={verifyPass}>
											<div className='mb-4 flex flex-col items-center '>
												<label
													className='block text-gray-700  font-normal mb-2'
													htmlFor='password'>
													To continue, please enter your password:
												</label>
												<input
													className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 '
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
				<section className='relative py-16 bg-gray-100 dark:bg-gray-900  '>
					<div className='container mx-auto px-4 '>
						<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-100 w-full mb-6 shadow-lg rounded-lg -mt-64 '>
							<h2
								onClick={handleShowAccountSettings}
								className=' text-sky-500 hover:text-sky-600 text-lg cursor-pointer ml-auto mr-10 mt-4'>
								User Settings
							</h2>
							<div className='px-6'>
								<div className='flex flex-wrap justify-center'>
									<div className='w-full lg:w-full px-4 lg:order-3 lg:text-right lg:self-center'>
										<h1 className='text-center  text-gray-800 text-3xl font-semibold my-4'>
											Account Settings
										</h1>

										{showEmailInputs && (
											<form
												className='text-lg '
												onSubmit={handleEmailSubmit}>
												<div className='flex flex-col items-center'>
													<label htmlFor='current-email'>Current Email</label>
													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 '
														type='email'
														name='currentEmail'
														id='currentEmail'
														value={currentEmail}
														onChange={(e) => setCurrentEmail(e.target.value)}
													/>
													<label htmlFor='new-email'>New Email</label>
													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 '
														type='email'
														name='newEmail'
														id='newEmail'
														value={newEmail}
														onChange={(e) => setNewEmail(e.target.value)}
													/>
													<label htmlFor='password'>Password</label>
													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 '
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
															onClick={() => {
																setShowEmailInputs(false)
																setShowButtons(true)
															}}
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
													<label htmlFor='current-password'>Current Password</label>
													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 '
														type='password'
														id='current-password'
														value={currentPassword}
														name='currentPassword'
														onChange={(e) => setCurrentPassword(e.target.value)}
													/>
													<label htmlFor='new-email'>New Password</label>
													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 '
														type='password'
														id='new-password'
														name='newPassword'
														value={newPassword}
														onChange={(e) => setNewPassword(e.target.value)}
													/>
													<label htmlFor='password'>Confirm new Password</label>
													<input
														className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 '
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
															onClick={() => {
																setShowPasswordInputs(false)
																setShowButtons(true)
															}}
															type='button'
															className='bg-gray-500 hover:bg-gray-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
															Cancel
														</button>
													</div>
												</div>
											</form>
										)}
										{showButtons && (
											<div className='flex justify-center items-center pb-10 pt-8'>
												<button
													type='button'
													onClick={handleChangeEmailClick}
													className='bg-sky-500 hover:bg-sky-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
													Change Email
												</button>
												<button
													type='button'
													onClick={handleChangePasswordClick}
													className='bg-sky-500 hover:bg-sky-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
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
