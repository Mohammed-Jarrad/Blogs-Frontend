import { createSlice } from "@reduxjs/toolkit"

const passwordSlice = createSlice({
	name: "password",
	initialState: {
		isValidLink: false,
		loading: false,
		isReset: false,
	},
	reducers: {
		setIsValidLink(state, action) {
			state.isValidLink = action.payload
		},
		setLoading(state, action) {
			state.loading = action.payload
		},
		setIsReset(state, action) {
			state.isReset = action.payload
		}
	},
})

const passwordReducer = passwordSlice.reducer
const passwordActions = passwordSlice.actions

export { passwordActions, passwordReducer }
