import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { deleteProfile, getAllUsers } from "../../redux/apiCalls/profileApiCall"
import { GridLoader } from "react-spinners"
import { logoutUser } from "../../redux/apiCalls/authApiCall"

const AdminUsers = () => {
	const { users, loading } = useSelector(s => s.profile)
	const { user: currentUser } = useSelector(s => s.auth)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllUsers())
	}, [])

	// Handle Delete User
	const handleDelete = userId => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this Account!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "var(--dark-blue-color)",
			iconColor: "red",
			cancelButtonColor: "var(--red-color)",
			confirmButtonText: "Yes, delete it!",
		}).then(result => {
			if (result.isConfirmed) {
				dispatch(deleteProfile(userId))
				if (userId === currentUser?._id) {
					dispatch(logoutUser())
				}
			}
		})
	}

	if (loading) {
		return (
			<div
				className="admin-table-wrapper"
				style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<GridLoader color="#36d7b7" size={30} />
				<h3>Deleting User...</h3>
			</div>
		)
	}

	return (
		<div className="admin-table-wrapper">
			<h2>Users</h2>

			<div className={`table-wrapper`}>
				<table>
					<thead>
						<tr>
							<th>Count</th>
							<th>User</th>
							<th>Email</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{users?.map((user, index) => (
							<tr key={user?._id}>
								<td>
									<div className="count">{index + 1}</div>
								</td>
								<td>
									<div className="user">
										<img src={user?.profilePhoto?.url} alt="" />
										<span>{user?.username}</span>
									</div>
								</td>
								<td>{user?.email}</td>
								<td>
									<div className="actions">
										<Link to={`/profile/${user?._id}`}>View Profile</Link>
										<button onClick={() => handleDelete(user?._id)}>Delete</button>
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

export default AdminUsers
