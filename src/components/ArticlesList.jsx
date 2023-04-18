import { Link, useNavigate } from 'react-router-dom'

const ArticleList = ({ articles, handleShowCreate }) => {
	const navigate = useNavigate()
	return (
		<div className='mx-auto'>
			<div className='flex flex-col items-center justify-center my-5'>
				<div className='relative'>
					<input
						type='text'
						className='py-2 pl-10 pr-3 rounded-lg w-96 focus:ring-1 ring-sky-400 outline-none transition-all text-lg duration-150 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400'
						placeholder='Search'
					/>
					<div className='absolute top-0 left-0 flex items-center h-full ml-3'>
						<i className='fa-solid fa-search text-gray-400'></i>
					</div>
				</div>
				<button
					className='mt-3 px-4 py-1 bg-none text-sky-400 hover:text-sky-500 font-medium rounded-md transition-all duration-150'
					onClick={handleShowCreate}>
					Create an Article
				</button>
			</div>

			{articles && (
				<div className='flex flex-wrap mx-auto my-6 justify-center space-x-12 w-10/12'>
					{articles?.map((article, index) => (
						<Link
							to={`/community/article/${article?._id}`}
							key={index}
							className='w-96 h-96 flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-all duration-150 bg-white dark:bg-gray-700 dark:text-gray-50'>
							{article?.imageUrl ? (
								<img
									className='w-full h-64 object-cover object-center'
									src={article?.imageUrl}
									alt={article?.title}
								/>
							) : (
								<div className='w-full h-64 object-cover object-center bg-sky-300 dark:bg-sky-700'></div>
							)}

							<div className='px-4 py-4 flex justify-between'>
								<div className='font-semibold text-xl mb-2'>{article?.title}</div>
								<span className='px-2 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200'>
									{new Date(article?.createdAt).toLocaleDateString('en-GB')}
								</span>
							</div>
							<div className='flex justify-between mt-auto ml-2 mb-2'>
								<div className='space-x-4 text-lg mr-4 mb-1'>
									<span className='space-x-1 text-gray-600 dark:text-gray-50'>
										<i className='fa-solid fa-thumbs-up text-sky-400 dark:text-sky-300 mx-1' />
										{article?.likes}
									</span>
									<span className='space-x-1  text-gray-600 dark:text-gray-50'>
										<i className='fa-solid fa-comment text-sky-400 dark:text-sky-300 mx-1' />
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
