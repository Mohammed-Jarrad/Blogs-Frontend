import { toast } from "react-toastify"
import { passwordActions } from "../slices/passwordSlice"
import req from "../../utils/request"

// Send rest password link
export function sendResetPasswordLink(email) {
	return async dispatch => {
		try {
			dispatch(passwordActions.setLoading(true))
			const { data } = await req.post(`/api/password/reset-password-link`, email)

			toast.success(data.message)
			dispatch(passwordActions.setLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(passwordActions.setLoading(false))
		}
	}
}

// Send rest password link
export function checkResestLink(userId, token) {
	return async dispatch => {
		try {
			await req.get(`/api/password/reset-password/${userId}/${token}`)

			dispatch(passwordActions.setIsValidLink(true))
		} catch (error) {
			console.log(error)
		}
	}
}

//  rest password
export function resetPassword(userId, token, password) {
	return async dispatch => {
		try {
			dispatch(passwordActions.setLoading(true))

			const { data } = await req.post(`/api/password/reset-password/${userId}/${token}`, password)
			
			dispatch(passwordActions.setIsReset(true))
			
			toast.success(data.message)
			dispatch(passwordActions.setLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(passwordActions.setLoading(false))
		}
	}
}
