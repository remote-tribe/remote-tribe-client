import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'


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
			<div className='flex flex-col items-center justify-center my-5'>
				<button
					className='mb-3 px-4 py-1 bg-none text-sky-400 hover:text-sky-500 font-medium rounded-md transition-all duration-150'
					onClick={handleShowCreate}>
					Create an Article
				</button>
				<div className='relative'>
					<input
						type='text'
						className='py-2 pl-10 pr-3 rounded-lg w-96 focus:ring-1 ring-sky-400 outline-none transition-all text-lg duration-150 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400'
						placeholder='Search'
						onChange={(event) => setSearchQuery(event.target.value)}
					/>
					<div className='absolute top-0 left-0 flex items-center h-full ml-3'>
						<i className='fa-solid fa-search text-gray-400'></i>
					</div>
				</div>
			</div>

			{filteredArticles && (
				<div className='flex flex-wrap mx-auto my-6 justify-center w-10/12'>
					{filteredArticles?.map((article, index) => (
						<Link
							to={`/community/article/${article?._id}`}
							key={index}
							className='w-96 h-96 mx-16 flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 bg-white dark:bg-gray-700 dark:text-gray-50 mb-16 hover:-translate-y-1 dark:hover:shadow-gray-700 '>
							{article?.imageUrl ? (
								<img
									className='w-full h-64 object-cover object-center'
									src={article?.imageUrl}
									alt={article?.title}
								/>
							) : (
								<div className='w-full h-64 object-cover object-center bg-gradient-to-tl from-sky-300 dark:from-sky-500 to-sky-700 dark:to-sky-900 '></div>
							)}

							<div className='px-4 py-4 flex justify-between'>
								<div className='font-semibold text-xl mb-2'>{article?.title}</div>
								<span className='px-2 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200'>
									{new Date(article?.createdAt).toLocaleDateString('en-GB')}
								</span>
							</div>
							<div className='flex justify-between mt-auto ml-2 mb-2'>
								<div className='space-x-4 text-xl mr-4 mb-1'>
									<span className='space-x-1 text-gray-600 dark:text-gray-50'>
										<i className='fa-solid fa-thumbs-up text-sky-400  mx-1' />
										{article?.likes}
									</span>
									<span className='space-x-1  text-gray-600 dark:text-gray-50'>
										<i className='fa-solid fa-comment text-sky-400 mx-1' />
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
