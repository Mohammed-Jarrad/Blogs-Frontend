import { toast } from "react-toastify"
import req from "../../utils/request"
import { categoryActions } from "../slices/categorySlice"

// Get All Categories
export function getAllCategories() {
	return async dispatch => {
		try {
			dispatch(categoryActions.setCategoriesLoading(true))
			const { data } = await req.get(`/api/categories`)
			dispatch(categoryActions.setCategories(data))
			dispatch(categoryActions.setCategoriesLoading(false))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
			dispatch(categoryActions.setCategoriesLoading(false))
		}
	}
}

// Create category
export function createCategory(category) {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.post(`/api/categories`, category, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			// update categories
			dispatch(categoryActions.addCategory(data))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}
// Delete Category
export function deleteCategory(categoryId) {
	return async (dispatch, getState) => {
		try {
			const { data } = await req.delete(`/api/categories/${categoryId}`, {
				headers: {
					Authorization: "Bearer " + getState().auth.user.token,
				},
			})
			toast.success(data.message)
			// update categories
			dispatch(categoryActions.deleteCategory(categoryId))
		} catch (error) {
			const { message } = error.response.data
			toast.warning(message)
		}
	}
}
