import React from "react"
import PostItem from "../PostItem/PostItem"
import "./PostsList.scss"

const PostsList = ({ posts }) => {
	return (
		<div className="posts-list-wrapper">
			<div className="posts-list">
				{posts?.map(post => (
					<PostItem post={post} key={post._id} />
				))}
			</div>
		</div>
	)
}

export default PostsList
