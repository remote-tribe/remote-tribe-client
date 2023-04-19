import Modal from 'react-modal'

export const DeleteModal = ({ isOpen, closeModal, handleDeleteClick }) => {
	return (
		<Modal isOpen={isOpen}>
			<div className='text-lg font-medium mb-4'>Are you sure you want to delete this article?</div>
			<div className='flex justify-end'>
				<button
					className='btn-secondary mr-2'
					onClick={closeModal}>
					Cancel
				</button>
				<button
					className='btn-primary'
					onClick={handleDeleteClick}>
					Delete
				</button>
			</div>
		</Modal>
	)
}
