import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: localStorage?.userInfo ? JSON.parse(localStorage.userInfo) : null,
		registerMessage: null,
		isEmailVerified: null,
		loading: true,
	},
	reducers: {
		login(state, action) {
			state.user = action.payload
		},
		logout(state) {
			state.user = null
		},
		setRegisterMessage(state, action) {
			state.registerMessage = action.payload
		},
		setUserPhoto(state, action) {
			state.user.profilePhoto = action.payload
		},
		setUsername(state, action) {
			state.user.username = action.payload
		},
		setIsEmailVerified(state, action) {
			state.isEmailVerified = true
			state.registerMessage = null
		},
		setLoading(state, action) {
			state.loading = action.payload
		},
	},
})

const authReducer = authSlice.reducer
const authActions = authSlice.actions

export { authActions, authReducer }
