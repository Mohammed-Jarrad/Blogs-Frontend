import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		profile: {},
		usersCount: null,
		users: [],
		loading: true,
		isProfileDeleted: false,
	},
	reducers: {
		setProfile(state, action) {
			state.profile = action.payload
		},
		setProfilePhoto(state, action) {
			state.profile.profilePhoto = action.payload
		},
		updateProfile(state, action) {
			state.profile = action.payload
		},
		setUsersCount(state, action) {
			state.usersCount = action.payload
		},
		setUsers(state, action) {
			state.users = action.payload
		},
		deleteUser(state, action) {
			const deletedUserId = action.payload
			state.users = state.users.filter(u => u._id !== deletedUserId)
		},
		setLoading(state, action) {
			state.loading = action.payload
		},
		setIsProfileDeleted(state, action) {
			state.isProfileDeleted = action.payload
		},
	},
})

const profileReducer = profileSlice.reducer
const profileActions = profileSlice.actions

export { profileActions, profileReducer }
