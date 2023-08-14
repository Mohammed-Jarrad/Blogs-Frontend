import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { deleteCategory, getAllCategories } from "../../redux/apiCalls/categoryApiCall"

const AdminCategories = () => {
	const { categories } = useSelector(s => s.category)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllCategories())
	}, [])

	// Handle Delete Categories
	const handleDelete = categoryId => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this Category!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "var(--dark-blue-color)",
			iconColor: "red",
			cancelButtonColor: "var(--red-color)",
			confirmButtonText: "Yes, delete it!",
		}).then(result => {
			if (result.isConfirmed) {
				dispatch(deleteCategory(categoryId))
			}
		})
	}

	return (
		<div className="admin-table-wrapper">
			<h2>Categories</h2>

			<div className={`table-wrapper`}>
				<table>
					<thead>
						<tr>
							<th>Count</th>
							<th>Category Title</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{categories?.map((item, index) => (
							<tr key={index}>
								<td>
									<div className="count">{index + 1}</div>
								</td>
								<td>
									<div className="category-title">{item.title}</div>
								</td>
								<td>
									<div className="actions">
										<button onClick={() => handleDelete(item._id)}>Delete</button>
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

export default AdminCategories
