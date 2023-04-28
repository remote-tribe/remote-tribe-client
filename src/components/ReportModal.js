import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from 'react-modal';
import { useState } from 'react';
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
export const ReportModal = ({ isOpen, closeModal, handleReport, }) => {
    const id = isOpen;
    const [report, setReport] = useState('');
    return (_jsxs(Modal, { style: customStyles, isOpen: isOpen, children: [_jsx("div", { className: 'mb-4 text-center text-lg font-medium ', children: "Please let us know why you are reporting this content. Your feedback helps us keep our community safe and respectful." }), _jsx("div", { className: 'my-4 flex justify-center', children: _jsx("textarea", { className: ' h-30 w-6/12  resize-none rounded border border-gray-300 px-4 py-4 text-center leading-tight text-gray-700 outline-none ring-sky-400 transition-all duration-150  focus:ring-2 hover:shadow  ', id: 'report', name: 'report', value: report, onChange: (e) => setReport(e.target.value) }) }), _jsxs("div", { className: 'flex justify-center space-x-4 text-lg', children: [_jsxs("button", { className: 'dark:hover:bg-pruple-500 rounded-md bg-sky-500 px-4 py-1 font-medium text-white transition-all duration-150 hover:bg-sky-600 hover:shadow-md ', onClick: () => handleReport(report, id), children: [' ', "Report"] }), _jsx("button", { className: 'rounded-md bg-gray-400 px-4 py-1 font-medium text-white transition-all duration-150 hover:bg-gray-500 hover:shadow-md', onClick: closeModal, children: "Cancel" })] })] }));
};
