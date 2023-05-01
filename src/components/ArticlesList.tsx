import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from 'react'

interface Article {
	_id: string
	title: string
	author: { username: string }
	imageUrl?: string
	createdAt: string
	likes: number
	comments: object[]
}

function ArticleList({ articles, handleShowCreate }: { articles: Article[]; handleShowCreate: () => void }) {
	const [searchQuery, setSearchQuery] = useState('')
	const [filteredArticles, setFilteredArticles] = useState<Article[]>([])

	useEffect(() => {
		const filtered = articles?.filter((article) => {
			const titleMatch = article?.title?.toLowerCase().includes(searchQuery.toLowerCase())
			const authorMatch = article?.author?.username.toLowerCase().includes(searchQuery.toLowerCase())
			return titleMatch || authorMatch
		})

		setFilteredArticles(filtered || [])
	}, [articles, searchQuery])

	return (
		<div className='mx-auto bg-gradient-to-bl from-sky-500 to-transparent '>
			<div className='flex flex-col items-center justify-center pt-5 '>
				<button
					className='mb-3 rounded-md bg-none px-4 py-1 text-xl font-medium text-sky-800 transition-all duration-150 hover:text-sky-950 dark:text-sky-200 dark:hover:text-sky-100'
					onClick={handleShowCreate}>
					Create an Article
				</button>
				<div className='relative'>
					<input
						type='text'
						className='w-96 rounded-lg py-2 pl-10 pr-3 text-lg outline-none ring-sky-800 transition-all duration-150 focus:ring-1 dark:bg-gray-700 dark:text-gray-200 dark:ring-sky-300 dark:placeholder:text-gray-400'
						placeholder='Search'
						onChange={(event) => setSearchQuery(event.target.value)}
					/>
					<div className='absolute left-0 top-0 ml-3 flex h-full items-center'>
						<i className='fa-solid fa-search text-gray-400'></i>
					</div>
				</div>
			</div>

			{filteredArticles && (
				<div className='fade-in-2 mx-auto mt-6 flex flex-wrap justify-center pb-6 md:w-10/12 '>
					{filteredArticles?.map((article, index) => (
						<Link
							key={index}
							to={`/community/article/${article?._id}`}
							className='mx-2 my-2 flex h-96 cursor-pointer flex-col overflow-hidden rounded-lg bg-slate-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-500 dark:bg-slate-700  dark:text-gray-100 dark:hover:shadow-slate-600 md:mx-16  md:mt-24 md:w-[30vw] '>
							{article?.imageUrl ? (
								<img
									loading='lazy'
									className='h-64 w-full '
									src={article?.imageUrl}
									alt={article?.title}
								/>
							) : (
								<div className='h-64 w-full bg-gradient-to-tl from-sky-300 to-sky-700 object-cover object-center dark:from-sky-500 dark:to-sky-900 '></div>
							)}

							<div className='flex flex-wrap px-4 py-4'>
								<div className='mb-2 text-xl font-medium'>{article?.title}</div>
							</div>
							<div className='mx-2 mb-2 mt-auto flex justify-between'>
								<div className='mb-1 mr-4 space-x-4 text-xl'>
									<span className='space-x-1 text-gray-600 dark:text-gray-100 '>
										<i className='fa-solid fa-thumbs-up dark:text-sky-599  mx-1 text-sky-500 dark:text-sky-400' />
										{article?.likes}
									</span>
									<span className='space-x-1  text-gray-600 dark:text-gray-100 '>
										<i className='fa-solid fa-comment dark:text-sky-599 mx-1 text-sky-500 dark:text-sky-400' />
										{article?.comments?.length}
									</span>
								</div>
								<span className=' px-2 py-1 text-sm font-semibold text-gray-700 dark:text-gray-100'>
									{new Date(article?.createdAt).toLocaleDateString('en-GB')}
								</span>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}

export default React.memo(ArticleList)
