import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const Login = async (email: string, password: string, rememberMe: boolean) => {
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
	} catch (error: any) {
		throw { message: error?.response?.data?.message }
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
		const token: any = localStorage.getItem('token')
		return jwtDecode(token)
	} catch (error) {
		return null
	}
}
