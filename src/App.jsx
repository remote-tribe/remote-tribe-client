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

function App() {
	return (
		<UserContextProvider>
			<div className='App bg-gray-100 dark:bg-gray-900 min-h-screen overflow-x-hidden'>
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
