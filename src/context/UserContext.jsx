import React, { createContext, useState, useEffect } from 'react'
import { Login, Logout, GetCurrentUser } from '../Auth'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [loggedUser, setLoggedUser] = useState(null)
	const [token, setToken] = useState(null)

	useEffect(() => {
		const user = GetCurrentUser()
		if (user) {
			setIsLoggedIn(true)
		}
	}, [])

	const handleLogin = async (email, password, rememberMe) => {
		try {
			const response = await Login(email, password, rememberMe)

			setIsLoggedIn(true)
			setLoggedUser(response?.user)

			return response
		} catch (error) {
			throw { message: error?.message }
		}
	}

	const handleLogout = () => {
		setToken(null)
		setLoggedUser(null)
		setIsLoggedIn(false)
		Logout()
	}

	const contextValue = {
		isLoggedIn,
		loggedUser,
		handleLogin,
		handleLogout,
		setLoggedUser,
		setToken,
	}

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserContextProvider
