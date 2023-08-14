import { toast } from "react-toastify"
import req from "../../utils/request"
import { postActions } from "../slices/postSlice"

// Fetch posts based on page number
export function fetchPosts(pageNumber) {
	return async dispatch => {
		try {
			dispatch(postActions.setPostsLoading(true))
			const { data } = await req.get(`/api/posts/?pageNumber=${pageNumber}`)
			dispatch(postActions.setPosts(data))
			dispatch(postActions.setPostsLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(postActions.setPostsLoading(false))
		}
	}
}

// Fetch posts based on page number
export function fetchAllPosts() {
	return async dispatch => {
		try {
			const { data } = await req.get(`/api/posts/`)
			dispatch(postActions.setPosts(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Fetch posts based on cateogry
export function fetchPostsByCategory(category) {
	return async dispatch => {
		try {
			dispatch(postActions.setCategoryPostsLoading(true))
			const { data } = await req.get(`/api/posts/?category=${category}`)
			dispatch(postActions.setCategoryPosts(data))
			dispatch(postActions.setCategoryPostsLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(postActions.setCategoryPostsLoading(false))
		}
	}
}

// Fetch posts count
export function getPostsCounts() {
	return async dispatch => {
		try {
			const { data } = await req.get(`/api/posts/count`)
			dispatch(postActions.setPostsCount(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Get Post Details
export function getSinglePost(postId) {
	return async dispatch => {
		try {
			dispatch(postActions.setPostLoading(true))
			const { data } = await req.get(`/api/posts/${postId}`)
			dispatch(postActions.setSinglePost(data))
			dispatch(postActions.setPostLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(postActions.setPostLoading(false))
		}
	}
}

// Create Post
export function createPost(post) {
	return async (dispatch, getState) => {
		try {
			dispatch(postActions.setLoading(true))

			await req.post(`/api/posts`, post, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
					"Content-Type": "multipart/form",
				},
			})

			dispatch(postActions.setPostIsCreated(true))
			toast.success("Your post has been uploaded successfully")
			dispatch(postActions.setLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(postActions.setLoading(false))
		}
	}
}

// Delete Post
export function deletePost(postId) {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.delete(`/api/posts/${postId}`, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			toast.success(data.message)
			// update all posts
			dispatch(postActions.deletePost(data.postId))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Update Post Image
export function updatePostImage(image, postId) {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.put(`/api/posts/update-image/${postId}`, image, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
					"Content-Type": "multipart/form",
				},
			})
			toast.success(data.message)
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Update Post Details
export function updatePostDetails(postDetails, postId) {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.put(`/api/posts/${postId}`, postDetails, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			console.log(data)
			dispatch(postActions.setSinglePost(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}

// Toggle Post Like
export function togglePostLike(postId) {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.put(
				`/api/posts/like/${postId}`,
				{},
				{
					headers: {
						Authorization: "Bearer " + getState().auth.user.token,
					},
				},
			)
			dispatch(postActions.setLike({ newLikes: data.likes, postId }))
		} catch (error) {
			console.log(error)
			const { message } = error.response?.data
			toast.warning(message)
		}
	}
}
