import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Animate, initTE } from 'tw-elements'

const ArticleList = ({ articles, handleShowCreate }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()

	const filteredArticles = articles?.filter((article) => {
		const titleMatch = article?.title?.toLowerCase().includes(searchQuery.toLowerCase())
		const authorMatch = article?.author?.username.toLowerCase().includes(searchQuery.toLowerCase())
		return titleMatch || authorMatch
	})
	return (
		<div className='mx-auto '>
			<div className='mt-5 flex flex-col items-center justify-center '>
				<button
					className='mb-3 rounded-md bg-none px-4 py-1 text-xl font-medium text-sky-400 transition-all duration-150 hover:text-sky-500'
					onClick={handleShowCreate}>
					Create an Article
				</button>
				<div className='relative'>
					<input
						type='text'
						className='w-96 rounded-lg py-2 pl-10 pr-3 text-lg outline-none ring-sky-400 transition-all duration-150 focus:ring-1 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400'
						placeholder='Search'
						onChange={(event) => setSearchQuery(event.target.value)}
					/>
					<div className='absolute left-0 top-0 ml-3 flex h-full items-center'>
						<i className='fa-solid fa-search text-gray-400'></i>
					</div>
				</div>
			</div>

			{filteredArticles && (
				<div className='fade-in mx-auto my-6 flex w-10/12 flex-wrap justify-center '>
					{filteredArticles?.map((article, index) => (
						<Link
							to={`/community/article/${article?._id}`}
							key={index}
							className='mx-16 mt-24 flex h-96 w-[30vw] cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-700 dark:text-gray-50 dark:hover:shadow-gray-700 md:mt-52  '>
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
								<div className='mb-2 text-xl font-semibold'>{article?.title}</div>
								<span className='px-2 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200'>
									{new Date(article?.createdAt).toLocaleDateString('en-GB')}
								</span>
							</div>
							<div className='mb-2 ml-2 mt-auto flex justify-between'>
								<div className='mb-1 mr-4 space-x-4 text-xl'>
									<span className='space-x-1 text-gray-600 dark:text-gray-50'>
										<i className='fa-solid fa-thumbs-up mx-1  text-sky-400' />
										{article?.likes}
									</span>
									<span className='space-x-1  text-gray-600 dark:text-gray-50'>
										<i className='fa-solid fa-comment mx-1 text-sky-400' />
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

export default ArticleList
