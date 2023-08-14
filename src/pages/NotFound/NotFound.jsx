import { Link } from "react-router-dom"
import "./NotFound.scss"

const NotFound = () => {
	return (
		<section className="not-found-page container">
			<h1>404</h1>
			<h1>Page Not Found!</h1>
			<Link to={"/"}>Go to home page</Link>
		</section>
	)
}

export default NotFound
