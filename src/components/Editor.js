import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export function Editor({ onContentChange, prevContent, }) {
    const [content, setContent] = useState(prevContent || '');
    useEffect(() => {
        setContent(prevContent || '');
    }, [prevContent]);
    const handleContentChange = (newContent) => {
        setContent(newContent);
        onContentChange(newContent);
    };
    return (_jsx(ReactQuill, { className: ' transition-all duration-150', value: content, onChange: handleContentChange }));
}
