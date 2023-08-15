import React, { useEffect, useState } from "react"
import "./PostDetails.scss"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import AddComment from "../../components/Comments/AddComment"
import CommentsList from "../../components/Comments/CommentsList"
import Swal from "sweetalert2"
import { UpdatePostModal } from "./UpdatePostModal"
import { useDispatch, useSelector } from "react-redux"
import { LoadingPlacholder } from "../../pages/CategoryPage/Category"
import {
	deletePost,
	getSinglePost,
	togglePostLike,
	updatePostImage,
} from "../../redux/apiCalls/postApiCall"
import LikesModal from "./LikesModal"
import FileResizer from "react-image-file-resizer"

const PostDetails = () => {
	const { id } = useParams()

	const { singlePost: post, postLoading } = useSelector(s => s.post)
	const { user: currentUser } = useSelector(s => s.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [file, setFile] = useState(null)
	const [showUpdateModal, setShowUpdateModal] = useState(false)
	const [showLikes, setShowLikes] = useState(false)

	const handleToggleLike = () => {
		dispatch(togglePostLike(id))
	}

	useEffect(() => {
		dispatch(getSinglePost(id))
	}, [dispatch, id])

	const resizeFile = async file => {
		let resized = null
		FileResizer.imageFileResizer(
			file,
			1000, // max width
			1000, // max height
			"JPEG", // compress format
			100, // quality
			0, // rotation
			uri => {
				resized = uri
			},
			"base64", // output type
		)

		// Waiting until the resized variable is set
		while (!resized) {
			await new Promise(resolve => setTimeout(resolve, 100))
		}

		return resized
	}

	const handleChangeImage = async e => {
		const selectedFile = e.target.files[0]
		const resizedImage = await resizeFile(selectedFile)

		if (resizedImage) {
			// Convert base64 image to file object
			const byteCharacters = atob(resizedImage.split(",")[1])
			const byteNumbers = new Array(byteCharacters.length)
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i)
			}
			const byteArray = new Uint8Array(byteNumbers)
			const imageFile = new Blob([byteArray], { type: "image/jpeg" })

			setFile(imageFile)
		}
	}

	//  Update Image Submit Handler
	const updateImageSubmitHandler = e => {
		e.preventDefault()
		if (!file) return toast.warning("there is no file provided")

		const formData = new FormData()
		formData.append("image", file)

		dispatch(updatePostImage(formData, id))
	}

	// Delete Post Handler
	const deletePostHandler = postId => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "var(--dark-blue-color)",
			iconColor: "red",
			cancelButtonColor: "var(--red-color)",
			confirmButtonText: "Yes, delete it!",
		}).then(result => {
			if (result.isConfirmed) {
				dispatch(deletePost(postId))
				navigate("/posts")
			}
		})
	}

	if (postLoading) {
		return <LoadingPlacholder newClass={"post-details-page container"} />
	}

	return (
		<section className="post-details-page container">
			<div className="post-title">
				<h1>{post?.title}</h1>
				<Link to={`/posts/categories/${post?.category}`} className="category">
					{post?.category}
				</Link>
			</div>

			<div className="post-image-wrapper">
				<img src={file ? URL.createObjectURL(file) : post?.image?.url} alt="" />
				{currentUser?._id === post?.user?._id && (
					<form onSubmit={updateImageSubmitHandler}>
						<label htmlFor="file">
							<span>Select New Image</span>
							<i className="bi bi-image-fill"></i>
						</label>
						<input
							type="file"
							name="file"
							id="file"
							onChange={e => {
								handleChangeImage(e)
							}}
						/>
						<button type="submit">Upload</button>
					</form>
				)}
			</div>

			<div className="post-user-info">
				<img src={post?.user?.profilePhoto?.url} alt="" />
				<div className="user-info">
					<strong>
						<Link to={`/profile/${post?.user?._id}`}>{post?.user?.username}</Link>
					</strong>
					<p>{new Date().toDateString(post?.createdAt)}</p>
				</div>
			</div>

			<div className="post-description">
				{post?.description?.split("\n").map((line, i) => (
					<p key={i}>{line}</p>
				))}
			</div>

			<div className="post-icons-wrapper">
				<div className="likes">
					{currentUser !== null && (
						<i
							className={`bi bi-hand-thumbs-up${
								post?.likes?.find(like => like?._id === currentUser?._id) ? "-fill" : ""
							}`}
							onClick={handleToggleLike}
						></i>
					)}
					<span onClick={() => setShowLikes(true)}>
						{post?.likes?.length} like{post?.likes?.length > 1 && "s"}
					</span>
				</div>

				{currentUser !== null && (
					<div className="controls">
						{currentUser?._id === post?.user?._id && (
							<i
								className="bi bi-pencil-square"
								onClick={() => {
									setShowUpdateModal(p => !p)
								}}
							></i>
						)}

						{(currentUser?.isAdmin || currentUser._id === post?.user?._id) && (
							<i className="bi bi-trash-fill" onClick={() => deletePostHandler(post?._id)}></i>
						)}
					</div>
				)}
			</div>

			{currentUser ? (
				<AddComment postId={post?._id} />
			) : (
				<div>
					<span>You need to login to add comment, </span>
					<Link to={"/login"} style={{ textDecoration: "underline" }}>
						<strong>Login</strong>
					</Link>
				</div>
			)}

			<CommentsList comments={post?.comments} />

			{showUpdateModal === true && (
				<UpdatePostModal closeModal={() => setShowUpdateModal(false)} post={post} />
			)}
			{showLikes === true && (
				<LikesModal closeModal={() => setShowLikes(false)} likes={post?.likes} />
			)}
		</section>
	)
}

export default PostDetails
