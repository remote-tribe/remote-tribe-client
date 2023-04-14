import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const sunIcon = document.querySelector('.sun-icon')
const moonIcon = document.querySelector('.moon-icon')

const userTheme = localStorage.getItem('theme')
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

const iconToggle = () => {
	moonIcon?.classList.toggle('hidden')
	sunIcon?.classList.toggle('hidden')
}

const themeCheck = () => {
	if (userTheme === 'dark' || (!userTheme && systemTheme)) {
		document.documentElement.classList.add('dark')
		moonIcon?.classList.add('hidden')
		return
	}
	sunIcon?.classList.add('hidden')
}

const themeSwitch = () => {
	if (document.documentElement.classList.contains('dark')) {
		document.documentElement.classList.remove('dark')
		localStorage.setItem('theme', 'light')
		iconToggle()
		return
	}
	document.documentElement.classList.add('dark')
	localStorage.setItem('theme', 'dark')
	iconToggle()
}

themeCheck()
export { themeSwitch }

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
