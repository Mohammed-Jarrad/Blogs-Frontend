import { toast } from "react-toastify"
import req from "../../utils/request"
import { commentActions } from "../slices/commentSlice.js"
import { postActions } from "../slices/postSlice"

// Create a Comment
export function createComment(comment) {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.post(`/api/comments`, comment, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			// update single post
			dispatch(postActions.addComment(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Update Comment
export function updateComment(commentId, text) {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.put(`/api/comments/${commentId}`, text, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			// update single post
			dispatch(postActions.updateComment(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Delete Comment
export function deleteComment(commentId) {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.delete(`/api/comments/${commentId}`, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			toast.success(data.message)
			// update single post
			dispatch(postActions.deleteComment(data.commentId))
			// update commetns array
			dispatch(commentActions.deleteComment(data.commentId))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Get Comments Count
export function getCommentsCount() {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.get("/api/comments/count", {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			dispatch(commentActions.setCommentsCount(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Get All Comments
export function getAllComments() {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.get("/api/comments", {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			dispatch(commentActions.setComments(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}
