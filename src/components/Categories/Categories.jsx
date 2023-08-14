import React, { useEffect } from "react"
import "./Categories.scss"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../../redux/apiCalls/categoryApiCall"

const Categories = () => {
	const { categories } = useSelector(s => s.category)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllCategories())
	}, [])

	return (
		<div className="categories-wrapper">
			<h3>Categories</h3>

			<div className="categories">
				{categories?.map(c => {
					return (
						<Link to={`/posts/categories/${c?.title}`} className="category-item" key={c?._id}>
							{c?.title}
						</Link>
					)
				})}
			</div>
		</div>
	)
}

export default Categories
