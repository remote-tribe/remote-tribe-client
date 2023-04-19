import React, { useEffect, useState } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.core.css'

export function Editor({ onContentChange, prevContent }) {
	const [content, setContent] = useState(prevContent || '')

	useEffect(() => {
		setContent(prevContent || '')
	}, [prevContent])

	const handleContentChange = (newContent) => {
		setContent(newContent)
		onContentChange(newContent)
	}

	return (
		<ReactQuill
			className='bg-white dark:bg-gray-300 dark:text-black text-xl focus-within:ring-2 rounded-lg transition-all duration-150 ring-sky-400 outline-none border-none dark:ring-sky-600'
			value={content}
			onChange={handleContentChange}
		/>
	)
}
