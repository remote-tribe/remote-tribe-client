import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const UserSettings = ({ userData, handleShowSettings, handleShowAccountSettings }) => {
	const { setLoggedUser } = useContext(UserContext)

	const [username, setUsername] = useState(userData?.username || '')
	const [profession, setProfession] = useState(userData?.profession || '')
	const [description, setDescription] = useState(userData?.description || '')
	const [location, setLocation] = useState({
		city: userData?.location?.city || '',
		country: userData?.location?.country || '',
	})

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
					<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-100 w-full mb-4  rounded-lg -mt-64 '>
						<Link
							onClick={handleShowAccountSettings}
							className=' text-sky-500 hover:text-sky-600 dark:text-sky-600 dark:hover:text-sky-700 text-xl absolute  -top-20 -right-12 cursor-pointer ml-auto mr-10 '>
							Account Settings
						</Link>
						<div className='px-6'>
							<div className='flex flex-wrap justify-center'>
								<div className='w-full lg:w-full px-4 lg:order-3 lg:text-right lg:self-center'>
									<h1 className='text-center  text-gray-800 text-3xl font-semibold my-4'>Profile Settings</h1>

									<form
										className='text-lg'
										onSubmit={handleSubmit}>
										<div className='mb-4 flex flex-col items-center '>
											<label
												className='block text-gray-700  font-normal mb-2'
												htmlFor='username'>
												Username:
											</label>
											<input
												className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 '
												id='username'
												type='text'
												value={username}
												name='username'
												onChange={(e) => setUsername(e.target.value)}
											/>
										</div>
										<div className='mb-4 flex flex-col items-center '>
											<label
												className='block text-gray-700  font-normal mb-2'
												htmlFor='profession'>
												Profession:
											</label>
											<input
												className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 '
												id='profession'
												type='text'
												value={profession}
												name='profession'
												onChange={(e) => setProfession(e.target.value)}
											/>
										</div>
										<div className='mb-4 flex flex-col items-center '>
											<label
												className='block text-gray-700  font-normal mb-2'
												htmlFor='location-city location-country'>
												Location:
											</label>
											<div className='flex justify-center space-x-2'>
												<input
													className='border-gray-300 border rounded w-2/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150'
													id='location-city'
													type='text'
													value={location.city}
													name='location-city'
													placeholder='City'
													onChange={(e) => setLocation({ city: e.target.value, country: location.country })}
												/>

												<input
													className='border-gray-300 border rounded w-2/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150'
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
												className='block text-gray-700  font-normal mb-2'
												htmlFor='description'>
												Description:
											</label>
											<textarea
												className=' border-gray-300 text-center border rounded w-6/12 h-30 resize-none py-4 px-4 text-gray-700 leading-tight cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150'
												id='description'
												name='description'
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											/>
										</div>
										<div className='flex justify-center items-center '>
											<button
												type='submit'
												className='bg-sky-500 hover:bg-sky-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
												Save
											</button>
											<button
												onClick={handleShowSettings}
												type='button'
												className='bg-gray-500 hover:bg-gray-600 uppercase text-white hover:shadow-md shadow text-md font-normal w-40 py-1 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 '>
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
