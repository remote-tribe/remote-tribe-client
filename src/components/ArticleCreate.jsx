import axios from 'axios'
import React, { useState } from 'react'
import { GetCurrentUser } from '../Auth'
import { Editor } from './Editor'
import { Image } from "cloudinary-react";

const CreateArticle = ({ handleShowCreate, loadAllArticles }) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const currentUser = GetCurrentUser()

	// set upload images
	const [selectedImage, setSelectedImage] = useState(null);
	const [uploadedImage, setUploadedImage] = useState('');
	const [uploaded, setUploaded] = useState(false);

	//START!! handle images
	const handleImageChange = (e) => {
		setSelectedImage(e.target.files[0]);
	};

	const handleImageUpload = async () => {
		if (!selectedImage) return;

		// create a FormData
		const formData = new FormData();
		formData.append("file", selectedImage);
		formData.append("upload_preset", "fsgqertv");

		//  sent POST request to Cloudinary
		try {
			const res = await axios.post(
				`https://api.cloudinary.com/v1_1/dxeejm8ef/image/upload`,
				formData
			);
			setUploadedImage(res.data.url);
			setUploaded(true);
		} catch (err) {
			console.error("Error uploading image: ", err);
		}
	};

	//END!! handle images



	const handleContentChange = (newContent) => {
		setContent(newContent)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const data = {
			userId: currentUser.id,
			title: title,
			content: content,
			imageUrl: uploadedImage,
		}

		axios
			.post(`http://localhost:5005/api/community/articles`, data)
			.then((response) => {
				console.log(response.data)
				loadAllArticles()
				handleShowCreate()
			})
			.catch((error) => {
				console.log(error)
			})

		setTitle('')
		setContent('')
		setImageUrl('')
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='mx-auto max-w-5xl space-y-4 '>
				<div>
					<label
						htmlFor='title'
						className='block text-center text-sm font-medium text-gray-800 dark:text-gray-200'>
						Title
					</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='cursor-pointer focus:cursor-text outline-none ring-sky-400 focus:ring-2 hover:shadow transition-all duration-150 mt-1 block w-full px-3 py-2 border border-gray-300 dark:text-sky-200 dark:bg-gray-700 rounded-md'
						required
					/>
				</div>




				<div>
					<label
						htmlFor='content'
						className='block text-center text-sm font-medium text-gray-800 dark:text-gray-200'>
						Content
					</label>
					<Editor onContentChange={handleContentChange} />
				</div>
				<div className='flex justify-center'>
					<button
						type='submit'
						className=' w-1/3  px-4 py-1 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500'>
						Create Article
					</button>
				</div>
			</form>
			<div>
				<h1>Image Upload with Cloudinary</h1>

				{/* Choose file input，仅在未上传图片时显示 */}
				{!uploaded && (
					<input type="file" onChange={handleImageChange} />
				)}

				{/* 缩略图 */}
				{uploadedImage && (
					<img
						src={uploadedImage}
						alt="Uploaded thumbnail"
						className="w-24 h-24 object-cover mt-4 rounded"
					/>
				)}

				{/* 上传按钮 */}
				<button
					onClick={handleImageUpload}
					disabled={uploaded} // 添加 disabled 属性
					className={`${uploaded
						? "bg-gray-400 cursor-not-allowed"
						: "bg-sky-400 hover:bg-sky-500"
						} px-4 py-2 text-white font-medium rounded-md transition-all duration-150`}
				>
					{uploaded ? "Uploaded" : "Upload Image"} {/* 根据上传状态修改按钮文字 */}
				</button>
			</div>


		</div>
	)
}

export default CreateArticle
