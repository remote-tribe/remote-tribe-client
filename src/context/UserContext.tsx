import { Login, Logout, GetCurrentUser } from '../Auth'
import React, { createContext, useState, useEffect, ReactNode } from 'react'

interface UserContextValue {
	isLoggedIn: boolean
	loggedUser: any
	handleLogin: (email: string, password: string, rememberMe: boolean) => Promise<any>
	handleLogout: () => void
	setLoggedUser: React.Dispatch<React.SetStateAction<any>>
	setToken: React.Dispatch<React.SetStateAction<any>>
}

interface UserContextProviderProps {
	children: ReactNode
}

export const UserContext = createContext<UserContextValue>({} as UserContextValue)

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
	const [token, setToken] = useState<any>(null)
	const [loggedUser, setLoggedUser] = useState<any>(null)
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

	useEffect(() => {
		const user = GetCurrentUser()
		if (user) {
			setIsLoggedIn(true)
		}
	}, [])

	const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
		try {
			const response = await Login(email, password, rememberMe)

			setIsLoggedIn(true)
			setLoggedUser(response?.user)

			return response
		} catch (error: any) {
			throw { message: error?.message }
		}
	}

	const handleLogout = () => {
		setToken(null)
		setLoggedUser(null)
		setIsLoggedIn(false)
		Logout()
	}

	const contextValue: UserContextValue = {
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
