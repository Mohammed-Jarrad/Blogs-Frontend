import "./CommentsList.scss"
import React, { useState } from "react"
import { UpdateCommentModal } from "./UpdateCommentModal"
import { useDispatch, useSelector } from "react-redux"
import { deleteComment  } from "../../redux/apiCalls/commentApiCall"
import Swal from "sweetalert2"
import Moment from "react-moment"

const CommentsList = ({ comments }) => {
	return (
		<div className="comments-list">
			<h3>
				<i className="bi bi-body-text"></i> {comments?.length} Comments
			</h3>

			<div className="list">
				{comments?.map(c => (
					<React.Fragment key={c?._id}>
						<Comment comment={c} key={c?._id} />
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

const Comment = ({ comment }) => {
	const { user: currentUser } = useSelector(s => s.auth)

	const dispatch = useDispatch()

	const [showCommentModal, setShowCommentModal] = useState(false)

	// Delete Comment Handler
	const deleteCommentHandler = async commentId => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "var(--dark-blue-color)",
			iconColor: "red",
			cancelButtonColor: "var(--red-color)",
			confirmButtonText: "Yes, delete it!",
		}).then(result => {
			if (result.isConfirmed) {
				dispatch(deleteComment(commentId))
			}
		})
	}

	return (
		<div className="comment">
			<div className="comment-info">
				<div className="user">
					<img src={comment?.user?.profilePhoto?.url} alt="" />
					<p>{comment?.username}</p>
				</div>
				<span>
					<Moment fromNow ago>
						{comment?.createdAt}
					</Moment>{" "}
					ago
				</span>
			</div>

			<div className="content">{comment?.text}</div>

			<div className="controls">
				{currentUser?._id === comment?.user?._id && (
					<i className="bi bi-pencil-square" onClick={_ => setShowCommentModal(true)}></i>
				)}
				{(currentUser?.isAdmin || currentUser?._id === comment?.user?._id) && (
					<i className="bi bi-trash-fill" onClick={() => deleteCommentHandler(comment?._id)}></i>
				)}
			</div>

			{showCommentModal === true && (
				<UpdateCommentModal closeModal={_ => setShowCommentModal(false)} comment={comment} />
			)}
		</div>
	)
}

export default CommentsList
