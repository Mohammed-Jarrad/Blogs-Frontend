import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { createCategory } from "../../redux/apiCalls/categoryApiCall"

const AddCategoryForm = () => {
	const [title, setTitle] = useState("")

	const dispatch = useDispatch()

	// handle form Submit
	const formSubmitHandler = e => {
		e.preventDefault()

		if (!title.trim()) return toast.error("please enter a category")

		dispatch(createCategory({ title }))
		setTitle('')
	}

	return (
		<div className="add-category-form">
			<form onSubmit={formSubmitHandler}>
				<h2>Add New Category</h2>
				<label htmlFor="">
					<span>category title</span>
					<input
						type="text"
						placeholder="Enter a new category..."
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</label>

				<button type="submit">Add Category</button>
			</form>
		</div>
	)
}

export default AddCategoryForm
