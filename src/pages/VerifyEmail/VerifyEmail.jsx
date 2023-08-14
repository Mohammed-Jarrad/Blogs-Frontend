import { Link, useParams } from "react-router-dom"
import "./VerifyEmail.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { verifyEmail } from "../../redux/apiCalls/authApiCall"
import { GridLoader } from "react-spinners"

const VerifyEmail = () => {
	const dispatch = useDispatch()

	const { loading, isEmailVerified } = useSelector(s => s.auth)

	const { token } = useParams()

	useEffect(() => {
		dispatch(verifyEmail(token))
	}, [dispatch, token])

	if (loading) {
		return (
			<div
				className="verify-email container"
				style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			>
				<GridLoader color="#36d7b7" size={30} />
				<h2>Verification...</h2>
			</div>
		)
	}

	return (
		<section className="verify-email container">
			{isEmailVerified === true ? (
				<>
					<i className="bi bi-patch-check"></i>
					<h1 className="title">Your Email has been successfully verified</h1>
					<Link to={"/login"}>Go to login page</Link>
				</>
			) : (
				<>
					<h1 className="not-found">Not Found</h1>
				</>
			)}
		</section>
	)
}

export default VerifyEmail
