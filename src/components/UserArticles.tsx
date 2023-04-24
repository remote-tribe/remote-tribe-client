import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface UserData {
	username: string
	_id: any
	profilePicture: string
	followers: object[]
	following: object[]
	articles: object[]
	profession: string
	description: string
	location: { country: string; city: string }
}

interface Article {
	_id: string
	title: string
	imageUrl?: string
	createdAt: string
	likes: number
	comments: object[]
}

export const UserArticles = ({
	handleShowArticlesSettings,
	userData,
}: {
	handleShowArticlesSettings: () => void
	userData: UserData
}) => {
	const [articles, setArticles] = useState<Article[]>([])

	useEffect(() => {
		getAllArticles()
	}, [])

	const getAllArticles = () => {
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/users/${userData._id}/articles`)
			.then(({ data }) => {
				setArticles(data.articles.reverse())
			})
			.catch((e) => {
				console.log('fail to access database..', e)
			})
	}

	return (
		<div className='fade-in-2 mt-6'>
			<div className='mx-auto my-8 flex w-10/12 flex-wrap justify-center space-x-12'>
				<button
					onClick={handleShowArticlesSettings}
					className=' cursor-pointer p-3 font-normal text-sky-400 transition-all duration-150 hover:text-sky-500'>
					<i className='fa-solid fa-arrow-left text-3xl'></i>
				</button>
			</div>
			{articles && (
				<div className='mx-auto flex w-10/12 flex-wrap  justify-center'>
					{articles?.map((article, index) => (
						<Link
							to={`/community/article/${article?._id}`}
							key={index}
							className='mx-12 mb-16 flex h-96 w-96 cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-600 dark:text-gray-50 dark:hover:shadow-slate-700'>
							{article?.imageUrl ? (
								<img
									className='h-64 w-full object-cover object-center'
									src={article?.imageUrl}
									alt={article?.title}
								/>
							) : (
								<div className='h-64 w-full bg-gradient-to-tl from-sky-300 to-sky-700 object-cover object-center dark:from-sky-500 dark:to-sky-900 '></div>
							)}

							<div className='flex justify-between px-4 py-4'>
								<div className='text-xl font-semibold'>{article?.title}</div>
								<span className=' px-2 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300'>
									{new Date(article?.createdAt).toLocaleDateString('en-GB')}
								</span>
							</div>
							<div className='ml-3 mt-auto flex justify-between'>
								<div className='space-x-4 text-lg '>
									<span className='space-x-1 text-xl text-gray-600 dark:text-gray-200'>
										<i className='fa-solid fa-thumbs-up mx-1 mb-2 text-sky-400' />
										{article?.likes}
									</span>
									<span className='space-x-1  text-gray-600 dark:text-gray-200'>
										<i className='fa-solid fa-comment mx-1 mb-2 text-sky-400' />
										{article?.comments?.length}
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
