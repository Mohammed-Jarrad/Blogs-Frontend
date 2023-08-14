import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./PostItem.scss"
import LikesModal from "../../pages/PostDetails/LikesModal"

const PostItem = ({ post }) => {
	const [showLikes, setShowLikes] = useState(false)

	return (
		<div className="post-item">
			<div className="post-title">
				<div className="user-info">
					<img src={post?.user?.profilePhoto?.url} alt="" />
					<div className="user">
						<Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
						<p className="date">{new Date(post?.createdAt).toLocaleDateString()}</p>
					</div>
				</div>
				<h4 className="title">{post?.title}</h4>
			</div>

			<div className="post-image">
				<img src={post?.image.url} alt="" />
			</div>

			<div className="post-details">
				<div className="insights">
					<div className="likes">
						<span onClick={() => setShowLikes(true)}>
							{`${post?.likes.length}`} like
							{post?.likes.length > 1 ? "s" : ""}
						</span>
					</div>
					<Link to={`/posts/categories/${post.category}`} className="category">
						{post?.category}
					</Link>
				</div>
				<div className="desc">
					{post?.description?.split("\n").map((line, i) => (
						<p key={i}>{line}</p>
					))}
				</div>
			</div>

			<div className="post-link">
				<Link to={`/posts/details/${post._id}`}>Read More...</Link>
			</div>

			{showLikes && <LikesModal closeModal={() => setShowLikes(false)} likes={post?.likes} />}
		</div>
	)
}

export default PostItem
