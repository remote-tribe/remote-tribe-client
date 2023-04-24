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

export const DeleteModal = ({
	isOpen,
	closeModal,
	handleDeleteClick,
}: {
	isOpen: any
	closeModal: () => void
	handleDeleteClick: () => void
}) => {
	return (
		<Modal
			style={customStyles}
			isOpen={isOpen}>
			<div className='mb-4 text-center text-lg font-medium '>
				Are you sure you want to delete this article?
			</div>
			<div className='flex justify-center space-x-4 text-lg'>
				<button
					className='rounded-md bg-rose-400 px-4 py-1 font-medium text-white transition-all duration-150 hover:bg-rose-500 hover:shadow-md dark:bg-rose-400 dark:hover:bg-rose-500'
					onClick={handleDeleteClick}>
					{' '}
					Delete
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
