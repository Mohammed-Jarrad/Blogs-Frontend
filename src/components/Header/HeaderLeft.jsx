import React from "react"
import { Link } from "react-router-dom"

const HeaderLeft = ({ showMenu, setShowMenu }) => {
	return (
		<div className="header-left">
			<Link to={"/"} className="header-logo">
				<strong>BLOG</strong>
				<i className="bi bi-pencil-fill"></i>
			</Link>
			<div className="header-menu" onClick={() => setShowMenu(p => !p)}>
				{showMenu ? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>}
			</div>
		</div>
	)
}

export default HeaderLeft
