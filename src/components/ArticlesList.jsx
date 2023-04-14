import { Link } from 'react-router-dom'

const ArticleList = ({ articles, handleShowCreate }) => {
	return (
		<div className='mx-auto max-w-5xl '>
			<div className='flex justify-center my-5'>
				<button
					className='w-1/3  px-4 py-1 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500'
					onClick={handleShowCreate}>
					Create an Article
				</button>
			</div>
			<div className='space-y-4'>
				{articles &&
					articles.map((article, index) => (
						<div key={index}>
							<Link to={`/community/article/${article._id}`}>
								<div
									key={index}
									className='p-4 hover:shadow-lg dark:shadow-slate-600 cursor-pointer rounded-lg shadow-md bg-white dark:bg-gray-700 space-y-4'>
									<div className='flex justify-between'>
										<Link
											to={``}
											className='text-lg text-gray-600 dark:text-gray-200 hover:text-sky-400'>
											{article.author.username}
										</Link>
										<p className='text-sm text-gray-600 dark:text-gray-200 '>
											{new Date(article.createdAt).toLocaleDateString()}
										</p>
									</div>
									<h2 className='text-xl font-semibold dark:text-gray-200 '>{article.title}</h2>

									<div className='flex justify-between'>
										<div className='flex space-x-3 mt-2'>
											<p className='text-sm text-gray-600 dark:text-gray-200  cursor-pointer hover:text-sky-400'>
												{article.likes} Likes
											</p>
											<p className='text-sm text-gray-600 dark:text-gray-200  cursor-pointer hover:text-sky-400'>
												{article.comments.length} Comments
											</p>
										</div>
									</div>
								</div>
							</Link>
						</div>
					))}
			</div>
		</div>
	)
}

export default ArticleList
