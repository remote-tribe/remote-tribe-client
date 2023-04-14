import { useParams } from 'react-router-dom'
import ArticleDetails from '../components/ArticleDetails'
import CreateArticle from '../components/ArticleCreate'
import UpdateArticle from '../components/ArticleUpdate'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ArticleDetailsPage() {
	const [article, setArticle] = useState([])

	const { articleId } = useParams()

	useEffect(() => {
		getArticle()
	}, [])

	const getArticle = () => {
		axios
			.get(`http://localhost:5005/api/community/article/${articleId}`)
			.then(({ data }) => {
				setArticle(data)
			})
			.catch((e) => {
				console.log('fail to access database..', e)
			})
	}

	return (
		<div className='container mx-auto p-4 space-y-8'>
			<ArticleDetails article={article} />
		</div>
	)
}

export default ArticleDetailsPage
