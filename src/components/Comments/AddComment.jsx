import React, { useState } from "react"
import { toast } from "react-toastify"
import "./AddComment.scss"
import { useDispatch } from "react-redux"
import { createComment } from "../../redux/apiCalls/commentApiCall"

const AddComment = ({ postId }) => {
	const dispatch = useDispatch()
	const [text, setText] = useState("")

	// Add Comment Handler
	const submitHandler = e => {
		e.preventDefault()
		if (!text) {
			return toast.error("please write something")
		}
		const comment = { postId, text }
		dispatch( createComment(comment) )
		setText("")
	}

	return (
		<form onSubmit={submitHandler} className="add-comment-form">
			<input
				type="text"
				placeholder="Add a Comment"
				value={text}
				onChange={e => {
					setText(e.target.value)
				}}
			/>
			<button type="submit">Comment</button>
		</form>
	)
}

export default AddComment
