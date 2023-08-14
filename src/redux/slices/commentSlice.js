import { createSlice } from "@reduxjs/toolkit"

const commentSlice = createSlice({
	name: "comment",
	initialState: {
		comments: [],
		commentsCount: null,
	},
	reducers: {
		setComments(state, action) {
			state.comments = action.payload
		},
		setCommentsCount(state, action) {
			state.commentsCount = action.payload
		},
		deleteComment(state, action) {
			const commentId = action.payload
			state.comments = state.comments.filter(c => c._id !== commentId)
		},
	},
})

const commentReducer = commentSlice.reducer
const commentActions = commentSlice.actions

export { commentActions, commentReducer }
