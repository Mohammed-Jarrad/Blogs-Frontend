import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { logoutUser } from "../../redux/apiCalls/authApiCall"

const HeaderRight = () => {
	const { user } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const [showDropMenu, setShowDropMenu] = useState(false)

	const toggleDropMenu = () => setShowDropMenu(p => !p)
	const closeMenu = () => setShowDropMenu(false)

	const { pathname: path } = useLocation()

	const logout = () => {
		closeMenu()
		dispatch(logoutUser())
	}

	return (
		<div className="header-right">
			{user ? (
				<div className="header-right-user-info">
					<div className="user-info" onClick={toggleDropMenu}>
						<span>{user?.username}</span>
						<img src={user?.profilePhoto?.url} alt="" />
					</div>

					<div className={`dropmenu ${showDropMenu ? "show-dropmenu" : ""}`}>
						<Link className="item" to={`/profile/${user?._id}`} onClick={closeMenu}>
							<span>Profile</span>
							<i className="bi bi-file-person"></i>
						</Link>
						<div
							className="item"
							onClick={() => {
								logout()
							}}
						>
							<span>Logout</span>
							<i className="bi bi-box-arrow-right"></i>
						</div>
					</div>
				</div>
			) : (
				<>
					<Link to={"/login"} className={`header-right-link ${path === "/login" ? "active" : ""}`}>
						<i className="bi bi-box-arrow-in-right"></i>
						<span>Login</span>
					</Link>
					<Link
						to={"/signup"}
						className={`header-right-link signup ${path === "/signup" ? "active" : ""}`}
					>
						<i className="bi bi-person-plus"></i>
						<span>Signup</span>
					</Link>
				</>
			)}
		</div>
	)
}

export default HeaderRight
