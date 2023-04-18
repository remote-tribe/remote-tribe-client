import { useState } from 'react'
import { SignInForm } from '../components/SignInForm'
import { SignUpForm } from '../components/SignUpForm'

export const SignInPage = () => {
	const [showRegister, setShowRegister] = useState(false)
	const [message, setMessage] = useState(null)

	const handleShowRegister = () => {
		setShowRegister(!showRegister)
	}

	return (
		<>
			{showRegister ? (
				<SignUpForm
					handleShowRegister={handleShowRegister}
					setMessage={setMessage}
				/>
			) : (
				<SignInForm
					handleShowRegister={handleShowRegister}
					setMessage={setMessage}
					message={message}
				/>
			)}
		</>
	)
}
