import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const Login = async (email, password, rememberMe) => {
	try {
		const response = await axios.post(`http://localhost:5005/auth/login`, {
			email,
			password,
			rememberMe,
		})

		if (response) {
			localStorage.setItem('token', response.data.authToken)
			return true
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
}

export const GetCurrentUser = () => {
	try {
		const token = localStorage.getItem('token')

		return jwtDecode(token)
	} catch (error) {
		return null
	}
}
