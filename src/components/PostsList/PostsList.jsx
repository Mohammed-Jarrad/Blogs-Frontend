import React from "react"
import PostItem from "../PostItem/PostItem"
import "./PostsList.scss"
import { useSelector } from "react-redux"
import { LoadingPlacholder } from "../../pages/CategoryPage/Category"

const PostsList = ({ posts }) => {
	const { postsLoading } = useSelector(s => s.post)

	return (
		<div className="posts-list-wrapper">
			{postsLoading ? (
				<LoadingPlacholder />
			) : (
				<div className="posts-list">
					{posts?.map(post => (
						<PostItem post={post} key={post._id} />
					))}
				</div>
			)}
		</div>
	)
}

export default PostsList
