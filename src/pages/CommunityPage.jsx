import ArticleList from '../components/ArticlesList'
import CreateArticle from '../components/ArticleCreate'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: ' auto',
	borderColor: 'red',
}

export const CommunityPage = () => {
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	const [articles, setArticles] = useState([])
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
		<div className='text-center text-sky-400 flex justify-center mt-60 '>
			<FadeLoader
				color={'#00a8e8'}
				loading={loading}
				css={override}
				size={150}
			/>
		</div>
	) : (
		<div>
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
