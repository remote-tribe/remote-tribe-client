import { useParams } from 'react-router-dom'
import ArticleDetails from '../components/ArticleDetails'
import CreateArticle from '../components/ArticleCreate'
import UpdateArticle from '../components/ArticleUpdate'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

function ArticleDetailsPage() {
	const [loading, setLoading] = useState(true)
	const [article, setArticle] = useState([])

	const { articleId } = useParams()

	useEffect(() => {
		getArticle()
	}, [])

	const getArticle = () => {
		setLoading(true)
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/community/article/${articleId}`)
			.then(({ data }) => {
				setLoading(false)
				data.comments = data.comments.reverse()
				setArticle(data)
			})
			.catch((error) => {
				setLoading(false)
				console.log(error)
			})
	}

	return loading ? (
		<div className='text-center mt-20'>
			<ClipLoader
				color={'#00a8e8'}
				loading={loading}
				css={override}
				size={150}
			/>
		</div>
	) : (
		<div className='container mx-auto p-4 space-y-8'>
			<ArticleDetails
				article={article}
				getArticle={getArticle}
			/>
		</div>
	)
}

export default ArticleDetailsPage
