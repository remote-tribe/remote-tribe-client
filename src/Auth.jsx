import axios from 'axios'

import jwtDecode from 'jwt-decode'

export const Login = async (email, password, rememberMe) => {
	try {
		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
			email,
			password,
			rememberMe,
		})

		if (response) {
			localStorage.setItem('token', response.data.authToken)

			return response.data
		}
	} catch (error) {
		console.error(error)
		throw new Error(error.response.data.message)
	}
}

export const Logout = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('username')
	window.location.reload()
	window.location.href = '/signin'
}

export const GetCurrentUser = () => {
	try {
		const token = localStorage.getItem('token')

		return jwtDecode(token)
	} catch (error) {
		return null
	}
}
