import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

export const UserSettings = ({ userData, handleShowSettings }) => {
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
				`http://localhost:5005/api/users/current`,
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
			{userData && (
				<section className='relative py-16 bg-gray-100 dark:bg-gray-900 '>
					<div className='container mx-auto px-4 '>
						<div className='relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-100 w-full mb-6 shadow-lg rounded-lg -mt-64 '>
							<div className='px-6'>
								<div className='flex flex-wrap justify-center'>
									<div className='w-full lg:w-full px-4 lg:order-3 lg:text-right lg:self-center'>
										<h1 className='text-center text-gray-800 text-3xl font-semibold my-4'>User Settings</h1>
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
													className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md focus:ring-2 ring-sky-400  cursor-pointer focus:cursor-text'
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
													className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md focus:ring-2 ring-sky-400  cursor-pointer focus:cursor-text'
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
														className='border-gray-300 border rounded w-2/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md focus:ring-2 ring-sky-400  cursor-pointer focus:cursor-text'
														id='location-city'
														type='text'
														value={location.city}
														name='location-city'
														placeholder='City'
														onChange={(e) => setLocation({ city: e.target.value, country: location.country })}
													/>

													<input
														className='border-gray-300 border rounded w-2/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md focus:ring-2 ring-sky-400  cursor-pointer focus:cursor-text'
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
													className=' border-gray-300 text-center border rounded w-6/12 h-30 resize-none py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-sky-400 cursor-pointer focus:cursor-text'
													id='description'
													name='description'
													value={description}
													onChange={(e) => setDescription(e.target.value)}
												/>
											</div>
											<div className='flex justify-center items-center pb-10 pt-8'>
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
				</section>
			)}
		</main>
	)
}
