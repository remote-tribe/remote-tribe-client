import ArticleList from '../components/ArticlesList'
import CreateArticle from '../components/ArticleCreate'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
export const CommunityPage = () => {


	const [articles, setArticles] = useState(null);

	useEffect(() => {
		getAllArticles();
	}, []);

	const loadAllArticles = () => {
		getAllArticles();
	};

	const getAllArticles = () => {
		axios
			.get("http://localhost:5005/api/community/articles")
			.then((DataFromDB) => { setArticles(DataFromDB.data.article) })
			.catch(e => { console.log("fail to access database.." + e) })
	}

	return <div>
		<h1>community page</h1>
		<CreateArticle loadAllArticles={loadAllArticles}></CreateArticle>
		<ArticleList articles={articles}></ArticleList>
	</div>
}
