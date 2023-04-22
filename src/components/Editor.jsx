import React, { useEffect, useState } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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
			className=' transition-all duration-150'
			value={content}
			onChange={handleContentChange}
		/>
	)
}
