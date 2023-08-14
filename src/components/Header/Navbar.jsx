import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const Navbar = ({ showMenu, closeMenu }) => {
	const { pathname: path } = useLocation()
	const { user } = useSelector(state => state.auth)

	return (
		<div className={`navbar ${showMenu === true && "show"}`}>
			<ul className="nav-links">
				<Link to={"/"} className={`nav-link ${path === "/" ? "active" : ""}`} onClick={closeMenu}>
					<i className="bi bi-house"></i>
					<span>Home</span>
				</Link>
				<Link
					to={"/posts"}
					className={`nav-link ${path === "/posts" ? "active" : ""}`}
					onClick={closeMenu}
				>
					<i className="bi bi-stickies"></i>
					<span>Posts</span>
				</Link>
				{user && (
					<>
						<Link
							to={"/posts/create-post"}
							className={`nav-link ${path === "/posts/create-post" ? "active" : ""}`}
							onClick={closeMenu}
						>
							<i className="bi bi-journal-plus"></i>
							<span>Create</span>
						</Link>
						{user?.isAdmin === true && (
							<Link
								to={"/admin-dashboard"}
								className={`nav-link ${path.includes("/admin-dashboard") ? "active" : ""}`}
								onClick={closeMenu}
							>
								<i className="bi bi-person-check"></i>
								<span>Admin Dashboard</span>
							</Link>
						)}
					</>
				)}
			</ul>
		</div>
	)
}

export default Navbar
