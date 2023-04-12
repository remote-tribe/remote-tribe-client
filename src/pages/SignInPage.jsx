import { useState } from 'react'
import { SignInForm } from '../components/SignInForm'
import { SignUpForm } from '../components/SignUpForm'

export const SignInPage = () => {
	const [showRegister, setShowRegister] = useState(false)

	const handleShowRegister = () => {
		setShowRegister(!showRegister)
	}

	return (
		<>
			{showRegister ? (
				<SignUpForm handleShowRegister={handleShowRegister} />
			) : (
				<SignInForm handleShowRegister={handleShowRegister} />
			)}
		</>
	)
}
