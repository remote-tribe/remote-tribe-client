import { useParams } from 'react-router-dom'
import ArticleDetails from '../components/ArticleDetails'
import CreateArticle from '../components/ArticleCreate'
import UpdateArticle from '../components/ArticleUpdate'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ArticleDetailsPage() {
	const [article, setArticle] = useState([])

	const { articleId } = useParams()

	console.log(articleId)

	useEffect(() => {
		getArticle()
	}, [])

	const getArticle = () => {
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/community/article/${articleId}`)
			.then(({ data }) => {
				data.comments = data.comments.reverse()
				setArticle(data)
			})
			.catch((e) => {
				console.log('fail to access database..', e)
			})
	}

	return (
		<div className='container mx-auto p-4 space-y-8'>
			<ArticleDetails
				article={article}
				getArticle={getArticle}
			/>
		</div>
	)
}

export default ArticleDetailsPage
