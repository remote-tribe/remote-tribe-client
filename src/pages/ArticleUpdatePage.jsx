import { useParams } from 'react-router-dom'
import UpdateArticle from '../components/ArticleUpdate'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ArticleUpdatePage() {
	const [article, setArticle] = useState([])

	const { articleId } = useParams()

	useEffect(() => {
		getArticle()
	}, [])

	const getArticle = () => {
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/community/article/${articleId}`)
			.then(({ data }) => {
				setArticle(data)
			})
			.catch((e) => {
				console.log('fail to access database..', e)
			})
	}

	return (
		<div className='container mx-auto p-4 space-y-8'>
			<UpdateArticle article={article} />
		</div>
	)
}

export default ArticleUpdatePage
