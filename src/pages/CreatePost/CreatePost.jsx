import React, { useEffect, useState } from "react"
import "./CreatePost.scss"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../../redux/apiCalls/categoryApiCall"
import { createPost } from "../../redux/apiCalls/postApiCall"
import { useNavigate } from "react-router-dom"
import { postActions } from "../../redux/slices/postSlice"
import { PropagateLoader } from "react-spinners"

const CreatePost = () => {
	const { loading } = useSelector(s => s.post)
	const { categories } = useSelector(s => s.category)
	const { postIsCreated } = useSelector(s => s.post)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [category, setCategory] = useState("")
	const [file, setFile] = useState(null)

	useEffect(() => {
		dispatch(getAllCategories())
	}, [])

	useEffect(() => {
		if (postIsCreated) {
			navigate("/")
			dispatch(postActions.setPostIsCreated(false))
		}
	}, [postIsCreated, navigate, dispatch])

	// From handler
	const formSubmitHandler = e => {
		e.preventDefault()
		if (!title.trim()) return toast.error("Post Title is required")
		if (!category.trim()) return toast.error("Post Category is required")
		if (!description.trim()) return toast.error("Post Description is required")
		if (!file) return toast.error("Post Image is required")

		let formData = new FormData()
		formData.append("image", file)
		formData.append("title", title)
		formData.append("description", description)
		formData.append("category", category)

		dispatch(createPost(formData))
	}

	return (
		<div className="craete-post container">
			<h1>Create Post Form</h1>

			<form onSubmit={formSubmitHandler}>
				<input
					autoFocus
					type="text"
					placeholder="Post Title"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<select value={category} onChange={e => setCategory(e.target.value)}>
					<option disabled value={""}>
						Select Category
					</option>
					{categories?.map(c => (
						<option value={c?.title} key={c?._id}>
							{c?.title}
						</option>
					))}
				</select>

				<textarea
					rows={5}
					placeholder="Post Description"
					value={description}
					onChange={e => setDescription(e.target.value)}
				></textarea>

				<input
					type="file"
					onChange={e => {
						setFile(e.target.files[0])
					}}
				/>

				{file ? <img src={URL.createObjectURL(file)} alt="" /> : null}

				{loading ? <PropagateLoader color="#36d7b7" /> : <button type="submit">Create</button>}
			</form>
		</div>
	)
}

export default CreatePost
