import { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners'
import { SignUpForm } from '../components/SignUpForm'
import { SignInForm } from '../components/SignInForm'

const override = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'red',
}

const SignInPage = () => {
	const [loading, setLoading] = useState(true)
	const [message, setMessage] = useState(null)
	const [showRegister, setShowRegister] = useState(false)

	useEffect(() => {
		setLoading(false)
	}, [])

	const handleShowRegister = () => {
		setShowRegister(!showRegister)
	}

	return loading ? (
		<div className='mt-60 flex justify-center text-center text-sky-400 '>
			<FadeLoader
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
					message={message}
				/>
			)}
		</>
	)
}

export default SignInPage
