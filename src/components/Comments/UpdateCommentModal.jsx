import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { updateComment } from "../../redux/apiCalls/commentApiCall"
import Modal from "../Modal/Modal"

export const UpdateCommentModal = ({ closeModal, comment }) => {
	const [text, setText] = useState(comment?.text)

	const dispatch = useDispatch()

	// form submit handler
	const formSubmitHandler = e => {
		e.preventDefault()

		if (!text.trim()) return toast.error("Please write something")

		dispatch(updateComment(comment?._id, { text }))

		closeModal()
	}

	return (
		<Modal closeModal={closeModal}>
			<form onClick={e => e.stopPropagation()} onSubmit={formSubmitHandler}>
				<abbr title="close">
					<i className="bi bi-x-circle-fill close" onClick={closeModal}></i>
				</abbr>

				<h1>Edit Comment</h1>

				<label htmlFor="">
					<span>Comment</span>
					<input
						autoFocus
						type="text"
						defaultValue={text}
						onChange={e => setText(e.target.value)}
					/>
				</label>

				<button type="submit">Edit Comment</button>
			</form>
		</Modal>
	)
}
