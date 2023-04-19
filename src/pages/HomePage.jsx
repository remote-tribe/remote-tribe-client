import { GetCurrentUser } from '../Auth'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { ClipLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const HomePage = () => {
	const [loading, setLoading] = useState(true)
	const { loggedUser, setLoggedUser } = useContext(UserContext)

	useEffect(() => {
		const currentUser = GetCurrentUser()
		setLoggedUser(currentUser)
		setLoading(false)
	}, [])

	return (
		<div>
			{loading ? (
				<div className='text-center mt-20'>
					<ClipLoader
						color={'#00a8e8'}
						loading={loading}
						css={override}
						size={150}
					/>
				</div>
			) : (
				<main className='h-full flex items-center px-6 lg:px-32 bg-sky-500 dark:bg-sky-900 text-white'>
					<section className='text-gray-700 body-font'>
						<div className='container mx-auto flex px-5 py-20 md:flex-row flex-col items-center'>
							<div className='lg:max-w-3xl lg:w-full  md:w-1/2 w-5/6 mb-10 md:mb-0'>
								<img
									className='object-cover object-center rounded-md shadow-md'
									alt='hero'
									src='https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
								/>
							</div>
							<div className='lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center'>
								<h1
									style={{ fontFamily: 'MuseoModerno' }}
									className='title-font font-moderno sm:text-6xl text-3xl mb-4 font-medium text-sky-800 dark:text-sky-400 '>
									Remote Tribe{' '}
								</h1>
								<h2 className='title-font sm:text-4xl text-2xl mb-4 font-medium text-white '>
									Work Remotely as a Developer and Live on Your Own Terms
								</h2>

								<p className='mb-8 leading-relaxed font-medium text-white '>
									Finding a remote developer job can be daunting - but it doesn't have to be. At Remote Tribe,
									we've made it easy. Our platform connects you with the best remote job opportunities from
									around the world, and our community of like-minded developers provides support and guidance
									every step of the way. Join the tribe today and start your remote work journey.
								</p>
								<div className='flex justify-center'>
									<button className='inline-flex text-white bg-sky-600 border-0 py-2 px-6 focus:outline-none hover:bg-sky-700 rounded text-xl transition-all duration-150 shadow'>
										Explore
									</button>
									<button className='ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 hover:text-gray-900 rounded text-xl transition-all duration-150 shadow'>
										Join Now
									</button>
								</div>
							</div>
						</div>
					</section>
				</main>
			)}
		</div>
	)
}
