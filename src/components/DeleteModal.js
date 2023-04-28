import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
export const DeleteModal = ({ isOpen, closeModal, handleDeleteClick, }) => {
    return (_jsxs(Modal, { style: customStyles, isOpen: isOpen, children: [_jsx("div", { className: 'mb-4 text-center text-lg font-medium ', children: "Are you sure you want to delete this article?" }), _jsxs("div", { className: 'flex justify-center space-x-4 text-lg', children: [_jsxs("button", { className: 'rounded-md bg-rose-400 px-4 py-1 font-medium text-white transition-all duration-150 hover:bg-rose-500 hover:shadow-md dark:bg-rose-400 dark:hover:bg-rose-500', onClick: handleDeleteClick, children: [' ', "Delete"] }), _jsx("button", { className: 'rounded-md bg-gray-400 px-4 py-1 font-medium text-white transition-all duration-150 hover:bg-gray-500 hover:shadow-md', onClick: closeModal, children: "Cancel" })] })] }));
};
