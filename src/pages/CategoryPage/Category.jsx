import React, { useEffect, useState } from "react"
import "./Category.scss"
import { useParams } from "react-router-dom"
import PostsList from "../../components/PostsList/PostsList"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostsByCategory } from "../../redux/apiCalls/postApiCall"

const Category = () => {
	const { category } = useParams()

	const dispatch = useDispatch()
	const { categoryPosts } = useSelector(s => s.post)

	useEffect(() => {
		dispatch(fetchPostsByCategory(category))
	}, [])

	return (
		<section className="category-page container">
			{categoryPosts?.length === 0 ? (
				<>
					<h1>No Posts on {category} Category</h1>
				</>
			) : (
				<>
					<h1>Posts based on {category}</h1>
					<PostsList posts={categoryPosts} />
				</>
			)}
		</section>
	)
}

export default Category
