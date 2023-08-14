import { toast } from "react-toastify"
import req from "../../utils/request"
import { profileActions } from "../slices/profileSlice"
import { authActions } from "../slices/authSlice"

// Get User Profile
export function getUserProfile(userId) {
	return async dispatch => {
		try {
			dispatch(profileActions.setLoading(true))
			const { data } = await req.get(`api/users/profile/${userId}`)
			dispatch(profileActions.setProfile(data))
			dispatch(profileActions.setLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(profileActions.setLoading(false))
		}
	}
}

// upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
	return async (dispatch, getState) => {
		try {
			dispatch(profileActions.setLoading(true))
			const { data } = await req.post(`/api/users/profile/profile-photo-upload`, newPhoto, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
					"Content-Type": "multipart/form-data",
				},
			})
			toast.success(data.message)
			// update profile
			dispatch(profileActions.setProfilePhoto(data.profilePhoto))
			dispatch(authActions.setUserPhoto(data.profilePhoto))
			// modify the user in local storage with new image
			const user = JSON.parse(localStorage.getItem("userInfo"))
			user.profilePhoto = data?.profilePhoto
			localStorage.userInfo = JSON.stringify(user)
			dispatch(profileActions.setLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(profileActions.setLoading(false))
		}
	}
}
// update  Profile
export function updateProfile(userId, profile) {
	return async (dispatch, getState) => {
		try {
			dispatch(profileActions.setLoading(true))
			const { data } = await req.put(`/api/users/profile/${userId}`, profile, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			dispatch(profileActions.updateProfile(data))
			dispatch(authActions.setUsername(data.username))
			// modify the user in local storage with user name
			const user = JSON.parse(localStorage.getItem("userInfo"))
			user.username = data?.username
			localStorage.userInfo = JSON.stringify(user)
			dispatch(profileActions.setLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(profileActions.setLoading(false))
		}
	}
}

// Delete Profile
export function deleteProfile(userId) {
	return async (dispatch, getState) => {
		try {
			dispatch(profileActions.setLoading(true))
			const { data } = await req.delete(`/api/users/profile/${userId}`, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			dispatch(profileActions.setIsProfileDeleted(true))
			setTimeout(() => dispatch(profileActions.setIsProfileDeleted(false)), 2000)
			//  update all users
			dispatch(profileActions.deleteUser(userId))
			toast.success(data.message)
			dispatch(profileActions.setLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(profileActions.setLoading(false))
		}
	}
}

// Get Users Count
export function getUsersCount() {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.get(`/api/users/count`, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})

			dispatch(profileActions.setUsersCount(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Get All Users
export function getAllUsers() {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.get(`/api/users/profile`, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})

			dispatch(profileActions.setUsers(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}
