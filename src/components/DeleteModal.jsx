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

export const DeleteModal = ({ isOpen, closeModal, handleDeleteClick }) => {
	return (
		<Modal
			style={customStyles}
			isOpen={isOpen}>
			<div className='text-lg font-medium mb-4 text-center '>
				Are you sure you want to delete this article?
			</div>
			<div className='flex justify-center space-x-4 text-lg'>
				<button
					className='py-1 px-4 bg-rose-400 dark:bg-rose-400 text-white font-medium rounded-md hover:bg-rose-500 dark:hover:bg-rose-500 transition-all duration-150 hover:shadow-md'
					onClick={handleDeleteClick}>
					{' '}
					Delete
				</button>
				<button
					className='py-1 px-4 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-md transition-all duration-150 hover:shadow-md'
					onClick={closeModal}>
					Cancel
				</button>
			</div>
		</Modal>
	)
}
