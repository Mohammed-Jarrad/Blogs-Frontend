import React, { useEffect } from "react"
import "./Category.scss"
import { useParams } from "react-router-dom"
import PostsList from "../../components/PostsList/PostsList"
import { useDispatch, useSelector } from "react-redux"
import { fetchPostsByCategory } from "../../redux/apiCalls/postApiCall"
import ContentLoader from "react-content-loader"

const Category = () => {
	const { category } = useParams()

	const dispatch = useDispatch()
	const { categoryPosts, categoryPostsLoading } = useSelector(s => s.post)

	useEffect(() => {
		dispatch(fetchPostsByCategory(category))
	}, [category, dispatch])

	if (categoryPostsLoading) {
		return <LoadingPlacholder newClass={"container category-page"} />
	}

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

export const LoadingPlacholder = ({ newClass }) => {
	return (
		<div className={`${newClass ? newClass : ""}`}>
			<ContentLoader
				viewBox="0 0 400 475"
				height={"100%"}
				width={"100%"}
				preserveAspectRatio="none"
				backgroundColor="#cfe8f7"
				foregroundColor="#ecebeb"
				speed={1}
			>
				<rect x="15" y="15" rx="4" ry="4" width="350" height="25" />
				<rect x="15" y="50" rx="2" ry="2" width="350" height="150" />
				<rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
				<rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
			</ContentLoader>
		</div>
	)
}

export default Category
