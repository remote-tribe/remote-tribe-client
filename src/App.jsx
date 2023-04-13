import './App.css'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/SignInPage'
import { CommunityPage } from './pages/CommunityPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { ProfilePage } from './pages/ProfilePage'


function App() {
	return (
		<div className='App bg-gray-100 dark:bg-gray-900 min-h-screen'>
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
						path='/community'
						element={<CommunityPage />}
					/>
					<Route
						path='/signin'
						element={<SignInPage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
