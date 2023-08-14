import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
	name: "post",
	initialState: {
		posts: [],
		postsCount: null,
		categoryPosts: [],
		singlePost: {},
		loading: false,
		postIsCreated: false,
	},
	reducers: {
		setPosts(state, action) {
			state.posts = action.payload
		},
		setPostsCount(state, action) {
			state.postsCount = action.payload
		},
		setSinglePost(state, action) {
			state.singlePost = action.payload
		},
		setCategoryPosts(state, action) {
			state.categoryPosts = action.payload
		},
		deletePost(state, action) {
			const deletedPostId = action.payload
			state.posts = state.posts.filter(p => p?._id !== deletedPostId)
		},
		setLoading(state, action) {
			state.loading = action.payload
		},
		setPostIsCreated(state, action) {
			state.postIsCreated = action.payload
		},
		setLike(state, action) {
			const { newLikes } = action.payload
			state.singlePost.likes = newLikes
		},
		addComment(state, action) {
			const comment = action.payload
			state.singlePost?.comments?.push(comment)
		},
		updateComment(state, action) {
			const updatedComment = action.payload
			state.singlePost.comments = state.singlePost?.comments.map(c => {
				return c?._id === updatedComment._id ? updatedComment : c
			})
		},
		deleteComment(state, action) {
			const commentId = action.payload
			state.singlePost.comments = state.singlePost.comments.filter(c => c._id !== commentId)
		},
	},
})

const postReducer = postSlice.reducer
const postActions = postSlice.actions

export { postActions, postReducer }
