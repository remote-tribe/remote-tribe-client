import './App.css'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/SignInPage'
import { CommunityPage } from './pages/CommunityPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { ProfilePage } from './pages/ProfilePage'
import { UserPage } from './pages/UserPage'
import { UsersPage } from './pages/UsersPage'
import UserContextProvider from './context/UserContext'
import ArticleDetailsPage from './pages/ArticleDetailsPage'
import ArticleUpdatePage from './pages/ArticleUpdatePage'
import { InboxPage } from './pages/InboxPage'
import { ClipLoader } from 'react-spinners'
import { useState, useEffect } from 'react'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

function App() {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		window.addEventListener('load', () => {
			setIsLoading(false)
		})
	}, [])
	return (
		<UserContextProvider>
			<div className='App bg-gray-100 dark:bg-gray-800 min-h-screen overflow-x-hidden'>
				<BrowserRouter>
					<NavBar></NavBar>
					<Routes>
						<Route
							path='/'
							element={<HomePage />}
						/>
						<Route
							path='/profile'
							element={<ProfilePage />}
						/>
						<Route
							path='/inbox'
							element={<InboxPage />}
						/>
						<Route
							path='/users'
							element={<UsersPage />}
						/>
						<Route
							path='/users/:userId'
							element={<UserPage />}
						/>
						<Route
							path='/community'
							element={<CommunityPage />}
						/>
						<Route
							path='/signin'
							element={<SignInPage />}
						/>
						<Route
							path='/community/article/:articleId'
							element={<ArticleDetailsPage />}
						/>
						<Route
							path='/community/article/:articleId/edit'
							element={<ArticleUpdatePage />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</UserContextProvider>
	)
}

export default App
