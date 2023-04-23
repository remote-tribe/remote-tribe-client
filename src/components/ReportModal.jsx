import { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

export const ReportModal = ({ isOpen, closeModal, handleReport }) => {
	const [report, setReport] = useState('')
	const id = isOpen
	return (
		<Modal
			style={customStyles}
			isOpen={isOpen}>
			<div className='mb-4 text-center text-lg font-medium '>
				Please let us know why you are reporting this content. Your feedback helps us keep our community safe
				and respectful.
			</div>
			<div className='my-4 flex justify-center'>
				<textarea
					className=' h-30 w-6/12  resize-none rounded border border-gray-300 px-4 py-4 text-center leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150  focus:ring-2 hover:shadow  '
					id='report'
					name='report'
					value={report}
					onChange={(e) => setReport(e.target.value)}
				/>
			</div>
			<div className='flex justify-center space-x-4 text-lg'>
				<button
					className='dark:hover:bg-pruple-500 rounded-md bg-sky-500 px-4 py-1 font-medium text-white transition-all duration-150 hover:bg-sky-600 hover:shadow-md '
					onClick={() => handleReport(report, id)}>
					{' '}
					Report
				</button>
				<button
					className='rounded-md bg-gray-400 px-4 py-1 font-medium text-white transition-all duration-150 hover:bg-gray-500 hover:shadow-md'
					onClick={closeModal}>
					Cancel
				</button>
			</div>
		</Modal>
	)
}
