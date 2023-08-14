import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { checkResestLink, resetPassword } from "../../redux/apiCalls/passwordApiCall"
import { CircularProgress } from "@mui/material"
import Swal from "sweetalert2"
import { passwordActions } from "../../redux/slices/passwordSlice"

const ResetPassword = () => {
	const { userId, token } = useParams()
	const dispatch = useDispatch()
	const { isValidLink, loading, isReset } = useSelector(s => s.password)

	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	// check reset link validation
	useEffect(() => {
		dispatch(checkResestLink(userId, token))
	}, [])

	const submitHandler = e => {
		e.preventDefault()

		if (!password.trim()) return toast.error("Password is required!")

		dispatch(resetPassword(userId, token, { password }))
	}

	if (isReset) {
		Swal.fire({
			title: "Your password reset successfully",
			text: "Go to login page",
			icon: "success",
			confirmButtonColor: "var(--green-color)",
			iconColor: "var(--green-color)",
			confirmButtonText: "Go!",
		}).then(result => {
			if (result.isConfirmed) {
				navigate("/login")
				dispatch(passwordActions.setIsReset(false))
			}
		})
	}

	if (!isValidLink) {
		return (
			<section className="login-page container">
				<h1>Not Found</h1>
			</section>
		)
	}

	return (
		<section className="login-page container">
			<div className="form-container">
				<h1>Reset Password</h1>

				<form onSubmit={submitHandler}>
					<div className="form-group">
						<label htmlFor="password">Enter New Password</label>
						<input
							value={password}
							onChange={e => setPassword(e.target.value)}
							type="password"
							id="password"
							placeholder="Enter New password"
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

export default ResetPassword
