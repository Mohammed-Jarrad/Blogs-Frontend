import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import AddCategoryForm from "./AddCategoryForm"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../../redux/apiCalls/categoryApiCall"
import { getUsersCount } from "../../redux/apiCalls/profileApiCall"
import { getPostsCounts } from "../../redux/apiCalls/postApiCall"
import { getCommentsCount } from "../../redux/apiCalls/commentApiCall"

const AdminMain = () => {
	const { categories } = useSelector(s => s.category)
	const { usersCount } = useSelector(s => s.profile)
	const { postsCount } = useSelector(s => s.post)
	const { commentsCount } = useSelector(s => s.comment)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllCategories())
		dispatch(getUsersCount())
		dispatch(getPostsCounts())
		dispatch(getCommentsCount())
	}, [])

	return (
		<div className="admin-main">
			<div className="admin-main-header">
				<div className="card">
					<h2>Users</h2>
					<div className="count">{usersCount}</div>
					<div className="icons">
						<Link to={"/admin-dashboard/users"}>See All Users</Link>
						<i className="bi bi-person"></i>
					</div>
				</div>

				<div className="card">
					<h2>Posts</h2>
					<div className="count">{postsCount}</div>
					<div className="icons">
						<Link to={"/admin-dashboard/posts"}>See All Posts</Link>
						<i className="bi bi-file-post"></i>
					</div>
				</div>

				<div className="card">
					<h2>Categories</h2>
					<div className="count">{categories?.length}</div>
					<div className="icons">
						<Link to={"/admin-dashboard/categories"}>See All Categories</Link>
						<i className="bi bi-tag-fill"></i>
					</div>
				</div>

				<div className="card">
					<h2>Comments</h2>
					<div className="count">{commentsCount}</div>
					<div className="icons">
						<Link to={"/admin-dashboard/comments"}>See All Comments</Link>
						<i className="bi bi-chat-left-text"></i>
					</div>
				</div>
			</div>

			<AddCategoryForm />
		</div>
	)
}

export default AdminMain
