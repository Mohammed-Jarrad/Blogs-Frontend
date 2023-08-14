import { createSlice } from "@reduxjs/toolkit"

const categorySlice = createSlice({
	name: "category",
	initialState: {
		categories: [],
	},
	reducers: {
		setCategories(state, action) {
			state.categories = action.payload
		},
		deleteCategory(state, action) {
			const categoryId = action.payload
			state.categories = state.categories.filter(c => c?._id !== categoryId)
		},
		addCategory(state, action) {
			const category = action.payload
			state.categories.push(category)
		},
	},
})

const categoryReducer = categorySlice.reducer
const categoryActions = categorySlice.actions

export { categoryActions, categoryReducer }
