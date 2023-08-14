import React from "react"
import { Link, useLocation } from "react-router-dom"

const AdminSideBar = ({ showSideBar, toggleShowSideBar }) => {
	const { pathname: path } = useLocation()

	return (
		<div className={`admin-sidebar ${showSideBar ? "show" : ""}`}>
			<Link
				to={"/admin-dashboard"}
				className={`main-link ${path === "/admin-dashboard" ? "active" : ""}`}
				onClick={toggleShowSideBar}
			>
				<i className="bi bi-columns"></i>
				<span>Dashboard</span>
			</Link>

			<ul className="admin-list">
				<Link
					to={"/admin-dashboard/users"}
					className={`${path === "/admin-dashboard/users" ? "active" : ""}`}
					onClick={toggleShowSideBar}
				>
					<i className="bi bi-person"></i>
					<span>Users</span>
				</Link>
				<Link
					to={"/admin-dashboard/posts"}
					className={`${path === "/admin-dashboard/posts" ? "active" : ""}`}
					onClick={toggleShowSideBar}
				>
					<i className="bi bi-file-post"></i>
					<span>Posts</span>
				</Link>
				<Link
					to={"/admin-dashboard/categories"}
					className={`${path === "/admin-dashboard/categories" ? "active" : ""}`}
					onClick={toggleShowSideBar}
				>
					<i className="bi bi-tag-fill"></i>
					<span>Categories</span>
				</Link>
				<Link
					to={"/admin-dashboard/comments"}
					className={`${path === "/admin-dashboard/comments" ? "active" : ""}`}
					onClick={toggleShowSideBar}
				>
					<i className="bi bi-chat-left-text"></i>
					<span>Comments</span>
				</Link>
			</ul>
		</div>
	)
}

export default AdminSideBar
