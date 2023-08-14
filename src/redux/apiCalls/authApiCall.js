import { toast } from "react-toastify"
import { authActions } from "../slices/authSlice"
import req from "../../utils/request"

// Login User
export function loginUser(user) {
	return async dispatch => {
		try {
			const { data } = await req.post(`/api/auth/login`, user)

			dispatch(authActions.login(data))
			localStorage.setItem("userInfo", JSON.stringify(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Logout User
export function logoutUser() {
	return dispatch => {
		dispatch(authActions.logout())
		localStorage.removeItem("userInfo")
	}
}

// Register User
export function registerUser(user) {
	return async dispatch => {
		try {
			const { data } = await req.post(`/api/auth/register`, user)

			dispatch(authActions.setRegisterMessage(data.message))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Verify Email
export function verifyEmail(token) {
	return async dispatch => {
		try {
			dispatch(authActions.setLoading(true))

			const { data } = await req.get(`/api/auth/verify/${token}`)

			dispatch(authActions.setIsEmailVerified())
			dispatch(authActions.setLoading(false))

			toast.success(data.message)
		} catch (error) {
			console.log(error)
			dispatch(authActions.setLoading(false))
		}
	}
}
