import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'

export const UserSettings = ({ userData, handleShowSettings, handleShowAccountSettings }) => {
	const [location, setLocation] = useState({
		city: userData?.location?.city || '',
		country: userData?.location?.country || '',
	})
	const { setLoggedUser } = useContext(UserContext)

	const [username, setUsername] = useState(userData?.username || '')
	const [profession, setProfession] = useState(userData?.profession || '')
	const [description, setDescription] = useState(userData?.description || '')

	const handleSubmit = async (e) => {
		e.preventDefault()
		const token = localStorage.getItem('token')
		try {
			const response = await axios.put(
				`${import.meta.env.VITE_BASE_URL}/api/users/current`,
				{
					username,
					description,
					location,
					profession,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			if (response) {
				setLoggedUser(response.data.user)
				localStorage.setItem('token', response.data.authToken)
				handleShowSettings(false)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<main className='profile-page z-0'>
			<section className='relative block h-60'></section>
			{userData && (
				<div className='container mx-auto px-4 '>
					<div className='relative -mt-64 mb-4 flex w-full min-w-0 flex-col break-words rounded-lg bg-white  dark:bg-slate-700 dark:text-gray-200 '>
						<Link
							onClick={handleShowAccountSettings}
							className=' absolute -right-12 -top-20 ml-auto mr-10 cursor-pointer  text-xl text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-500 '>
							Account Settings
						</Link>
						<div className='px-6'>
							<div className='flex flex-wrap justify-center'>
								<div className='w-full px-4 lg:order-3 lg:w-full lg:self-center lg:text-right'>
									<h1 className='my-4  text-center text-3xl font-semibold text-gray-800 dark:text-gray-200'>
										Profile Settings
									</h1>

									<form
										className='text-lg'
										onSubmit={handleSubmit}>
										<div className='mb-4 flex flex-col items-center '>
											<label
												className='mb-2 block  font-normal text-gray-700'
												htmlFor='username'>
												Username:
											</label>
											<input
												className='text-md w-1/5 cursor-pointer rounded border border-gray-300 px-4 py-2 text-center  leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow  dark:border-slate-600 dark:bg-gray-800 dark:text-gray-300'
												id='username'
												type='text'
												value={username}
												name='username'
												onChange={(e) => setUsername(e.target.value)}
											/>
										</div>
										<div className='mb-4 flex flex-col items-center '>
											<label
												className='mb-2 block  font-normal text-gray-700'
												htmlFor='profession'>
												Profession:
											</label>
											<input
												className='text-md w-1/5 cursor-pointer rounded border border-gray-300 px-4 py-2 text-center  leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow  dark:border-slate-600 dark:bg-gray-800 dark:text-gray-300'
												id='profession'
												type='text'
												value={profession}
												name='profession'
												onChange={(e) => setProfession(e.target.value)}
											/>
										</div>
										<div className='mb-4 flex flex-col items-center '>
											<label
												className='mb-2 block  font-normal text-gray-700'
												htmlFor='location-city location-country'>
												Location:
											</label>
											<div className='flex justify-center space-x-2'>
												<input
													className='text-md w-2/5 cursor-pointer rounded border border-gray-300 px-4 py-2 text-center  leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-gray-800 dark:text-gray-300'
													id='location-city'
													type='text'
													value={location.city}
													name='location-city'
													placeholder='City'
													onChange={(e) => setLocation({ city: e.target.value, country: location.country })}
												/>

												<input
													className='text-md w-2/5 cursor-pointer rounded border border-gray-300 px-4 py-2 text-center  leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:outline-none focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-gray-800 dark:text-gray-300'
													id='location-country'
													type='text'
													value={location.country}
													name='location-country'
													placeholder='Country'
													onChange={(e) => setLocation({ city: location.city, country: e.target.value })}
												/>
											</div>
										</div>

										<div className='mb-4 flex flex-col items-center'>
											<label
												className='mb-2 block  font-normal text-gray-700'
												htmlFor='description'>
												Description:
											</label>
											<textarea
												className=' h-30 w-6/12 cursor-pointer resize-none rounded border border-gray-300 px-4 py-4 text-center leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150 focus:cursor-text focus:ring-2 hover:shadow dark:border-slate-600 dark:bg-gray-800 dark:text-gray-300'
												id='description'
												name='description'
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											/>
										</div>
										<div className='flex items-center justify-center '>
											<button
												type='submit'
												className='text-md mb-1 w-40 rounded bg-sky-500 py-1 font-normal uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-sky-600 hover:shadow-md sm:mr-2 '>
												Save
											</button>
											<button
												onClick={handleShowSettings}
												type='button'
												className='text-md mb-1 w-40 rounded bg-gray-500 py-1 font-normal uppercase text-white shadow outline-none transition-all duration-150 ease-linear focus:outline-none hover:bg-gray-600 hover:shadow-md sm:mr-2 '>
												Cancel
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}
