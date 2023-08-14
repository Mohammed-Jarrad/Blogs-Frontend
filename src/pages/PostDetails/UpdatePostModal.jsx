import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getAllCategories } from "../../redux/apiCalls/categoryApiCall"
import { updatePostDetails } from "../../redux/apiCalls/postApiCall"
import Modal from "../../components/Modal/Modal"

export const UpdatePostModal = ({ closeModal, post }) => {
	const { categories } = useSelector(s => s.category)

	const dispatch = useDispatch()

	const [title, setTitle] = useState(post?.title)
	const [description, setDescription] = useState(post?.description)
	const [category, setCategory] = useState(post?.category)

	useEffect(() => {
		dispatch(getAllCategories())
	}, [dispatch])

	// form submit handler
	const formSubmitHandler = e => {
		e.preventDefault()

		if (!title.trim()) return toast.error("Post Title is required")
		if (!category.trim()) return toast.error("Post Category is required")
		if (!description.trim()) return toast.error("Post Description is required")

		const updatedPost = { title, category, description }

		dispatch(updatePostDetails(updatedPost, post?._id))
		closeModal()
	}

	return (
		<Modal closeModal={closeModal}>
			<form onClick={e => e.stopPropagation()} onSubmit={formSubmitHandler}>
				<h1>Update Post</h1>

				<label htmlFor="">
					<span>Post Title</span>
					<input
						autoFocus
						type="text"
						defaultValue={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</label>

				<label htmlFor="">
					<span>Post Category</span>
					<select defaultValue={post?.category} onChange={e => setCategory(e.target.value)}>
						{categories?.map(c => (
							<option value={c?.title} key={c?._id}>
								{c?.title}
							</option>
						))}
					</select>
				</label>

				<label htmlFor="">
					<span>Post Description</span>
					<textarea
						defaultValue={description}
						onChange={e => setDescription(e.target.value)}
						rows={6}
					/>
				</label>

				<button type="submit">Edit Post</button>
			</form>
		</Modal>
	)
}
