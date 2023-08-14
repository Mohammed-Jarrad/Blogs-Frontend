import React, { useState } from "react"
import "./Header.scss"
import HeaderLeft from "./HeaderLeft"
import Navbar from "./Navbar"
import HeaderRight from "./HeaderRight"

const Header = () => {
	const [showMenu, setShowMenu] = useState(false)

	const closeMenu = () => setShowMenu(false)

	return (
		<header className="header">
			<div className="container">
				<HeaderLeft setShowMenu={setShowMenu} showMenu={showMenu} />

				<Navbar closeMenu={closeMenu} showMenu={showMenu} />

				<HeaderRight />
			</div>
		</header>
	)
}

export default Header
