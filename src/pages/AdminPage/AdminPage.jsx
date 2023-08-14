import { useState } from "react"
import "./AdminPage.scss"
import AdminSideBar from "./AdminSideBar"
import { Outlet } from "react-router-dom"

const AdminPage = () => {
	const [showSideBar, setShowSideBar] = useState(false)

	const toggleShowSideBar = _ => setShowSideBar(p => !p)

	return (
		<section className="admin-dashboard">
			<div className={`overlay ${showSideBar ? "active" : ""}`} onClick={toggleShowSideBar}></div>

			{showSideBar ? (
				<i className="settings bi bi-x" onClick={toggleShowSideBar}></i>
			) : (
				<i className="settings bi bi-gear-fill" onClick={toggleShowSideBar}></i>
			)}

			<AdminSideBar showSideBar={showSideBar} toggleShowSideBar={toggleShowSideBar} />

			<div className="outlet">
				<Outlet />
			</div>
		</section>
	)
}

export default AdminPage
