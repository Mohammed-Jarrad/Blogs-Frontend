import { createSlice } from "@reduxjs/toolkit"

const categorySlice = createSlice({
	name: "category",
	initialState: {
		categories: [],
		categoriesLoading: true,
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
		setCategoriesLoading(state, a) {
			state.categoriesLoading = a.payload
		},
	},
})

const categoryReducer = categorySlice.reducer
const categoryActions = categorySlice.actions

export { categoryActions, categoryReducer }
