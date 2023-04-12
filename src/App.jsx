import './App.css'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { AboutPage } from './pages/AboutPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'

function App() {
	return (
		<div className='App bg-gray-100 dark:bg-gray-900'>
			<BrowserRouter>
				<NavBar></NavBar>
				<Routes>
					<Route
						path='/'
						element={<HomePage />}
					/>
					<Route
						path='/about'
						element={<AboutPage />}
					/>
					<Route
						path='/login'
						element={<LoginPage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
