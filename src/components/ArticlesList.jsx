import { Link, useNavigate } from 'react-router-dom'

const ArticleList = ({ articles, handleShowCreate }) => {
	const navigate = useNavigate()
	return (
		<div className='mx-auto'>
			<div className='flex justify-center my-5'>
				<button
					className='w-1/3  px-4 py-1 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500'
					onClick={handleShowCreate}>
					Create an Article
				</button>
			</div>
			{articles && (
				<div class='flex flex-wrap mx-auto my-6 justify-center space-x-12 w-10/12'>
					{articles?.map((article, index) => (
						<Link
							to={`/community/article/${article?._id}`}
							key={index}
							className='w-96 h-96 flex flex-col rounded overflow-hidden shadow hover:shadow-lg cursor-pointer transition-all duration-150'>
							<img
								className='w-full h-64 object-cover object-center'
								src={article?.imageUrl}
								alt={article?.title}
							/>

							<div className='px-4 py-4 flex justify-between'>
								<div className='font-bold text-2xl mb-2'>{article?.title}</div>
								<span className=' px-2 py-2 text-sm font-semibold text-gray-700'>07/02/2023</span>
							</div>
							<div className='flex justify-between mt-auto'>
								<Link
									to={`/users/${article?.author?._id}`}
									className=' flex justify-between mt-auto mb-2 px-4 rounded-full py-1 text-lg font-semibold text-sky-400 mr-2 hover:text-sky-500 transition-all duration-150'>
									{article?.author.username}
								</Link>
								<div className='space-x-4 text-lg mr-4 mt-1'>
									<span className='space-x-1 text-gray-600'>
										<i className='fa-solid fa-thumbs-up text-sky-400' />
										{article?.likes}
									</span>
									<span className='space-x-1  text-gray-600'>
										<i className='fa-solid fa-comment text-sky-400' />
										{article?.likes}
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
