import './App.css'
import Modal from 'react-modal'
import { HomePage } from './pages/HomePage'
import { useState, useEffect } from 'react'
import { UserPage } from './pages/UserPage'
import { NavBar } from './components/NavBar'
import { UsersPage } from './pages/UsersPage'
import { InboxPage } from './pages/InboxPage'
import { SignInPage } from './pages/SignInPage'
import { ProfilePage } from './pages/ProfilePage'
import { CommunityPage } from './pages/CommunityPage'
import UserContextProvider from './context/UserContext'
import ArticleUpdatePage from './pages/ArticleUpdatePage'
import ArticleDetailsPage from './pages/ArticleDetailsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

declare module 'react' {
	interface Attributes {
		css?: any
		size?: any
	}
}

Modal.setAppElement('#root')

function App() {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		window.addEventListener('load', () => {
			setIsLoading(false)
		})
	}, [])

	return (
		<UserContextProvider>
			<div className='App min-h-screen overflow-x-hidden bg-gray-100 dark:bg-gray-800 '>
				<BrowserRouter>
					<NavBar></NavBar>
					<Routes>
						<Route
							path='/'
							element={<HomePage />}
						/>
						<Route
							path='/users/:userId'
							element={<UserPage />}
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
							path='/signin'
							element={<SignInPage />}
						/>
						<Route
							path='/profile'
							element={<ProfilePage />}
						/>
						<Route
							path='/community'
							element={<CommunityPage />}
						/>
						<Route
							path='/community/article/:articleId/edit'
							element={<ArticleUpdatePage />}
						/>
						<Route
							path='/community/article/:articleId'
							element={<ArticleDetailsPage />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</UserContextProvider>
	)
}

export default App
