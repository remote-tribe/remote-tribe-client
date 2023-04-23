import axios from 'axios'
import { FadeLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ArticleList from '../components/ArticlesList'
import CreateArticle from '../components/ArticleCreate'

const override = {
	display: 'block',
	margin: ' auto',
	borderColor: 'red',
}

export const CommunityPage = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(true)
	const [showCreate, setShowCreate] = useState(false)

	useEffect(() => {
		getAllArticles()
	}, [])

	const loadAllArticles = () => {
		getAllArticles()
	}

	const getAllArticles = () => {
		setLoading(true)
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/community/articles`)
			.then(({ data }) => {
				setLoading(false)
				setArticles(data.reverse())
			})
			.catch((error) => {
				setLoading(false)
				console.log(error)
			})
	}

	const handleShowCreate = () => {
		if (!token) {
			navigate('/signin')
		}
		setShowCreate(!showCreate)
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
		<div className=''>
			{showCreate ? (
				<CreateArticle
					handleShowCreate={handleShowCreate}
					loadAllArticles={loadAllArticles}
				/>
			) : (
				<ArticleList
					handleShowCreate={handleShowCreate}
					articles={articles}
				/>
			)}
		</div>
	)
}
