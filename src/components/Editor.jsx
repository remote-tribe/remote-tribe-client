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
			className='bg-white text-xl focus-within:ring-1 rounded-lg transition-all duration-150 ring-sky-400'
			value={content}
			onChange={handleContentChange}
		/>
	)
}
