import React from "react"
import "./Footer.scss"

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<p>
					Copy Right <span>&copy;</span> 2023
				</p>
				<ul className="social">
					<li>
						<i className="bi bi-facebook"></i>
					</li>
					<li>
						<i className="bi bi-twitter"></i>
					</li>
					<li>
						<i className="bi bi-instagram"></i>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer
