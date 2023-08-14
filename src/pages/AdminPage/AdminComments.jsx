import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { deleteComment, getAllComments } from "../../redux/apiCalls/commentApiCall"

const AdminComments = () => {
	const { comments } = useSelector(s => s.comment)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllComments())
	}, [])

	// Handle Delete Comment
	const handleDelete = commentId => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this Comment!",
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
		<div className="admin-table-wrapper">
			<h2>Comments</h2>

			<div className={`table-wrapper`}>
				<table>
					<thead>
						<tr>
							<th>Count</th>
							<th>User</th>
							<th>Comment Text</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{comments?.map((comment, index) => (
							<tr key={index}>
								<td>
									<div className="count">{index + 1}</div>
								</td>
								<td>
									<div className="user">
										<img src={comment?.user?.profilePhoto?.url} alt="" />
										<span>{comment?.username}</span>
									</div>
								</td>
								<td>{comment?.text}</td>
								<td>
									<div className="actions">
										<button onClick={() => handleDelete(comment?._id)}>Delete</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminComments
