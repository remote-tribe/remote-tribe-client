import { useEffect, useState } from 'react'
import { SignInForm } from '../components/SignInForm'
import { SignUpForm } from '../components/SignUpForm'
import { ClipLoader } from 'react-spinners'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

export const SignInPage = () => {
	const [loading, setLoading] = useState(true)
	const [showRegister, setShowRegister] = useState(false)
	const [message, setMessage] = useState(null)

	useEffect(() => {
		setLoading(false)
	}, [])

	const handleShowRegister = () => {
		setShowRegister(!showRegister)
	}

	return loading ? (
		<div className='text-center text-sky-400 mt-20'>
			<ClipLoader
				color={'#00a8e8'}
				loading={loading}
				css={override}
				size={150}
			/>
		</div>
	) : (
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
