import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, fetchAllPosts } from "../../redux/apiCalls/postApiCall"

const AdminPosts = () => {
	const { posts } = useSelector(s => s.post)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchAllPosts())
	}, [])

	// Handle Delete Post
	const handleDelete = (postId) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this Post!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "var(--dark-blue-color)",
			iconColor: "red",
			cancelButtonColor: "var(--red-color)",
			confirmButtonText: "Yes, delete it!",
		}).then(result => {
			if (result.isConfirmed) {
				dispatch(deletePost(postId))
			}
		})
	}

	return (
		<div className="admin-table-wrapper">
			<h2>Posts</h2>

			<div className={`table-wrapper`}>
				<table>
					<thead>
						<tr>
							<th>Count</th>
							<th>User</th>
							<th>Post Title</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{posts.map((post, index) => (
							<tr key={post._id}>
								<td>
									<div className="count">{index + 1}</div>
								</td>
								<td>
									<div className="user">
										<img src={post?.user?.profilePhoto?.url} alt="" />
										<span>{post?.user?.username}</span>
									</div>
								</td>
								<td>{post?.title}</td>
								<td>
									<div className="actions">
										<Link to={`/posts/details/${post?._id}`}>View Post</Link>
										<button onClick={() => handleDelete(post?._id)}>Delete</button>
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

export default AdminPosts
