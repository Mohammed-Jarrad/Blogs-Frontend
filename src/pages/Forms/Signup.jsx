import { useState } from "react"
import "./Form.scss"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../redux/apiCalls/authApiCall"
import Swal from "sweetalert2"
import { authActions } from "../../redux/slices/authSlice"

const Signup = () => {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()
	const { registerMessage } = useSelector(state => state.auth)
	const navigate = useNavigate()

	const register = e => {
		e.preventDefault()

		if (!username.trim()) return toast.error("Username is required!")
		if (!email.trim()) return toast.error("Email is required!")
		if (!password.trim()) return toast.error("Password is required!")

		const user = { username, email, password }
		dispatch(registerUser(user))
	}

	if (registerMessage) {
		Swal.fire({
			title: registerMessage,
			icon: "success",
		}).then(result => {
			if (result.isConfirmed) {
				// navigate("/login")
				dispatch(authActions.setRegisterMessage(null))
			}
		})
	}

	return (
		<section className="signup-page container">
			<div className="form-container">
				<h1>Create New Account</h1>

				<form onSubmit={register}>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							value={username}
							onChange={e => setUsername(e.target.value)}
							type="text"
							id="username"
							placeholder="Enter your name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={e => setEmail(e.target.value)}
							type="email"
							id="email"
							placeholder="Enter your email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={e => setPassword(e.target.value)}
							type="password"
							id="password"
							placeholder="Enter your password"
						/>
					</div>

					<button type="submit">Register</button>
				</form>

				<div className="form-footer">
					Already have an account? <Link to={"/login"}>Login</Link>
				</div>
			</div>
		</section>
	)
}

export default Signup
