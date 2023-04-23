import { Link } from 'react-router-dom'

export const UserProfile = ({ userData }) => {
	return (
		<main className='profile-page '>
			<section className='relative block h-80'>
				<div className='pointer-events-none absolute bottom-0 left-0 right-0 top-auto h-16 w-full overflow-hidden'>
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
				<div className='fade-in-2 relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-lg  bg-white dark:bg-slate-700 dark:text-gray-200'>
					<div className='px-6'>
						<div className='flex flex-wrap justify-center'></div>

						<div className='mt-12 text-center'>
							<h3 className='mb-2 text-4xl font-semibold leading-normal '>{userData?.username}</h3>
							{userData.location && (
								<div className='mb-2 mt-10 text-sm font-bold  uppercase leading-normal'>
									<i className='fas fa-solid fa-location-dot mr-2 text-2xl text-sky-500 dark:text-sky-400'></i>
									{userData?.location?.city}
									{userData?.location?.city && userData?.location?.country && ','}{' '}
									{userData?.location?.country}
								</div>
							)}
							<div className='mb-2 mt-10  text-lg font-medium'>
								{userData?.profession && (
									<div className='mb-2 mt-10 text-lg font-medium'>
										<Link
											to={``}
											className='font-normal transition-all hover:text-sky-400'>
											{' '}
											{userData?.profession}
										</Link>
									</div>
								)}
							</div>
						</div>
						<div className='mx-auto mt-10 border-t pt-4 text-center dark:border-slate-600'>
							<div className='flex flex-wrap justify-center'>
								<div className='w-full px-4 lg:w-9/12'>
									<p className='mb-4 text-lg leading-relaxed'>{userData?.description}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}
