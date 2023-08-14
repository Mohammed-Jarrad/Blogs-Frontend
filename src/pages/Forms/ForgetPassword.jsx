import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { sendResetPasswordLink } from "../../redux/apiCalls/passwordApiCall"
import { CircularProgress } from "@mui/material"

const ForgetPassword = () => {
	const [email, setEmail] = useState("")

	const dispatch = useDispatch()
	const { loading } = useSelector(s => s.password)

	const formHandler = e => {
		e.preventDefault()

		if (!email.trim()) return toast.error("Email is required!")

		dispatch(sendResetPasswordLink({ email }))
	}

	return (
		<section className="forget-page container">
			<div className="form-container">
				<h1>Froget Password?</h1>

				<form onSubmit={formHandler}>
					<div className="form-group">
						<label htmlFor="email">Your Email</label>
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							type="email"
							id="email"
							placeholder="Enter your email"
						/>
					</div>

					<button type="submit">
						{loading ? (
							<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
								Loading
								<CircularProgress size={20} />
							</div>
						) : (
							"Submit"
						)}
					</button>
				</form>
			</div>
		</section>
	)
}

export default ForgetPassword
