import ArticleList from '../components/ArticlesList'
import CreateArticle from '../components/ArticleCreate'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const CommunityPage = () => {
	const [articles, setArticles] = useState([])
	const [showCreate, setShowCreate] = useState(false)

	useEffect(() => {
		getAllArticles()
	}, [articles])

	const getAllArticles = () => {
		axios
			.get('http://localhost:5005/api/community/articles')
			.then(({ data }) => {
				setArticles(data)
			})
			.catch((e) => {
				console.log('fail to access database..', e)
			})
	}

	const handleShowCreate = () => {
		setShowCreate(!showCreate)
	}

	return (
		<div>
			<div className='flex justify-center'>
				<h1
					onClick={() => setShowCreate(false)}
					className='text-4xl text-sky-400 my-5 cursor-pointer'>
					Community Page
				</h1>
			</div>
			{showCreate ? (
				<CreateArticle handleShowCreate={handleShowCreate} />
			) : (
				<ArticleList
					handleShowCreate={handleShowCreate}
					articles={articles}
				/>
			)}
		</div>
	)
}
