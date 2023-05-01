import './App.css'
import Modal from 'react-modal'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import UserContextProvider from './context/UserContext'
import { NavBar } from './components/NavBar'

const HomePage = lazy(() => import('./pages/HomePage'))
const UserPage = lazy(() => import('./pages/UserPage'))
const UsersPage = lazy(() => import('./pages/UsersPage'))
const InboxPage = lazy(() => import('./pages/InboxPage'))
const SignInPage = lazy(() => import('./pages/SignInPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const CommunityPage = lazy(() => import('./pages/CommunityPage'))
const ArticleUpdatePage = lazy(() => import('./pages/ArticleUpdatePage'))
const ArticleDetailsPage = lazy(() => import('./pages/ArticleDetailsPage'))

declare module 'react' {
	interface Attributes {
		css?: any
		size?: any
	}
}

Modal.setAppElement('#root')

function App() {
	return (
		<UserContextProvider>
			<div className='App min-h-screen overflow-x-hidden bg-gray-100 antialiased dark:bg-gray-800'>
				<BrowserRouter>
					<NavBar />
					<Suspense>
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
					</Suspense>
				</BrowserRouter>
			</div>
		</UserContextProvider>
	)
}

export default App
