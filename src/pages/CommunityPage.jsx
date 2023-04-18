import ArticleList from '../components/ArticlesList'
import CreateArticle from '../components/ArticleCreate'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CommunityPage = () => {
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
		axios
			.get(`${import.meta.env.VITE_BASE_URL}/api/community/articles`)
			.then(({ data }) => {
				setArticles(data.reverse())
			})
			.catch((e) => {
				console.log('fail to access database..', e)
			})
	}

	const handleShowCreate = () => {
		if (!token) {
			navigate('/signin')
		}
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
