import { useState } from 'react'
import axios from 'axios'

export const UserSettings = ({ userData, handleShowSettings }) => {
	const [username, setUsername] = useState(userData?.username)
	const [description, setDescription] = useState(userData?.description)

	const handleSubmit = async () => {
		const token = localStorage.getItem('token')
		try {
			const response = await axios.put(
				`http://localhost:5005/api/users/current`,
				{
					username,
					description,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
			console.log(response.data)
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
													className='border-gray-300 border rounded w-1/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none  text-center text-md focus:ring-2 ring-sky-400 '
													id='username'
													type='text'
													value={username}
													name='username'
													onChange={(e) => setUsername(e.target.value)}
												/>
											</div>

											<div className='mb-4 flex flex-col items-center'>
												<label
													className='block text-gray-700  font-normal mb-2'
													htmlFor='description'>
													Description:
												</label>
												<textarea
													className=' border-gray-300 text-justify border rounded w-10/12 h-56 resize-none py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 ring-sky-400'
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
