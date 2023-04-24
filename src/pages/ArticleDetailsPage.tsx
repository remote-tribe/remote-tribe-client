import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import React, { useEffect, useState } from 'react'
import ArticleDetails from '../components/ArticleDetails'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

interface Article {
	_id: string
	title: string
	imageUrl?: string
	createdAt: string
	likes: number
	comments: object[]
}

function ArticleDetailsPage() {
	const [article, setArticle] = useState<Article>({} as Article)
	const [loading, setLoading] = useState(true)

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
		<div className='mt-60 flex justify-center text-center text-sky-400 '>
			<FadeLoader
				color={'#00a8e8'}
				loading={loading}
				css={override}
				size={150}
			/>
		</div>
	) : (
		<div className='container mx-auto space-y-8'>
			<ArticleDetails setLoading={setLoading} />
		</div>
	)
}

export default ArticleDetailsPage
