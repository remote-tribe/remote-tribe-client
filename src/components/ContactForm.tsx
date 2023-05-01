import axios from 'axios'
import { useState } from 'react'
import { GetCurrentUser } from '../Auth'

const ContactForm = ({
	toggleForm,
	alert,
	showAlert,
}: {
	toggleForm: () => void
	alert: string
	showAlert: (value: string) => void
}) => {
	const currentUser = GetCurrentUser() as { username: string; id: string }
	const [error, showError] = useState<string>('')
	const [subject, setSubject] = useState('')
	const [message, setMessage] = useState('')
	const [showDropdown, setShowDropdown] = useState(false)
	const subjects = ['General Inquiry', 'Technical Support', 'Other']

	const handleSubjectChange = (selectedSubject: string) => {
		setSubject(selectedSubject)
		setShowDropdown(false)
	}

	const handleMessageChange = (e: any) => {
		setMessage(e.target.value)
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (subject === '') {
			showError('Please select a subject.')
			setTimeout(() => {
				showError('')
			}, 5000)
			return
		}
		if (message === '') {
			showError('Message can not be empty.')
			setTimeout(() => {
				showError('')
			}, 5000)
			return
		}
		try {
			await axios.post(`${import.meta.env.VITE_BASE_URL}/api/contact`, {
				content: message,
				subject,
				id: currentUser?.id,
			})
			setSubject('')
			setMessage('')
			showAlert('Message sent successfully!')
			toggleForm()
			setTimeout(() => showAlert(''), 5000)
		} catch (error) {
			console.log(error)
		}
	}

	const handleCancel = () => {
		setSubject('')
		setMessage('')
		toggleForm()
	}

	return (
		<div
			className='fade-in-2 h-[94.2vh] w-screen bg-gradient-to-tl from-sky-600  to-transparent pt-3'
			onClick={() => {
				if (showDropdown) setShowDropdown(false)
			}}>
			{error && (
				<div
					className=' fade-in-2 relative mx-auto  w-fit  rounded border border-rose-700 bg-rose-500  px-8 py-3 text-white'
					role='error'>
					<span className='block sm:inline'>{error}</span>
				</div>
			)}
			<form className=' mx-auto max-w-xl'>
				<div className='relative mb-6  pt-20'>
					<h1 className='pb-16 text-center text-3xl text-sky-950 dark:text-gray-200'>Contact Us</h1>
					<label
						htmlFor='subject'
						className='mb-2 block text-center font-medium text-gray-700 dark:text-gray-200'>
						Subject
					</label>
					<div className='relative mx-auto max-w-xs transition-all duration-150 hover:shadow'>
						<div
							onClick={() => setShowDropdown(!showDropdown)}
							className='w-full cursor-pointer rounded-md border bg-white p-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600  dark:bg-gray-700 dark:text-gray-200'>
							{subject ? subject : 'Select a subject'}
							<svg
								className='pointer-events-none absolute right-3 top-4 h-4 w-4'
								viewBox='0 0 20 20'
								fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M9.29289 13.2929C9.68342 13.6834 10.3166 13.6834 10.7071 13.2929L15.7071 8.29289C16.0976 7.90237 16.0976 7.2692 15.7071 6.87868C15.3166 6.48815 14.6834 6.48815 14.2929 6.87868L10 11.1716L5.70711 6.87868C5.31658 6.48815 4.68342 6.48815 4.29289 6.87868C3.90237 7.2692 3.90237 7.90237 4.29289 8.29289L9.29289 13.2929Z'
									clipRule='evenodd'
								/>
							</svg>
						</div>
						{showDropdown && (
							<div className='absolute mt-1 w-full rounded-md bg-white shadow-lg dark:bg-gray-700  dark:text-gray-200'>
								{subjects.map((subject: string, index: number) => (
									<div
										key={index}
										className='cursor-pointer px-4 py-3 hover:bg-sky-100 dark:hover:bg-sky-900'
										onClick={() => handleSubjectChange(subject)}>
										{subject}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<div className='mb-6 mt-8'>
					<label
						htmlFor='message'
						className='mb-2 block text-center font-medium text-gray-700 dark:text-gray-200'>
						Message
					</label>
					<textarea
						id='message'
						name='message'
						value={message}
						onChange={handleMessageChange}
						rows={5}
						className='w-full resize-none rounded-md border p-3 shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-sky-400 '
					/>
				</div>
				<div className='flex justify-center'>
					<button
						type='submit'
						onClick={handleSubmit}
						className='mr-2 rounded-md bg-sky-500  px-8 py-2 text-white transition-all duration-150  focus:bg-sky-700 hover:bg-sky-600 active:bg-sky-700 dark:bg-sky-600    dark:focus:bg-sky-800 dark:hover:bg-sky-700 dark:active:bg-sky-800'>
						Submit
					</button>
					<button
						type='button'
						onClick={handleCancel}
						className='rounded-md bg-gray-200 px-8  py-2 text-gray-700 transition-all duration-150 focus:bg-gray-400 hover:bg-gray-300 active:bg-gray-400'>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}

export default ContactForm
