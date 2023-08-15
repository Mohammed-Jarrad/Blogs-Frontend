import { useEffect, useState } from "react"
import PostsList from "../../components/PostsList/PostsList"
import "./Profile.scss"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import UpdateProfileModal from "./UpdateProfileModal"
import { useDispatch, useSelector } from "react-redux"
import {
	deleteProfile,
	getUserProfile,
	uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall"
import { useNavigate, useParams } from "react-router-dom"
import { logoutUser } from "../../redux/apiCalls/authApiCall"
import { GridLoader } from "react-spinners"
import Resizer from "react-image-file-resizer"

const Profile = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [file, setFile] = useState(null)
	const [showUpadteProfile, setShowUpdateProfile] = useState(false)

	const { id } = useParams()
	const { user: currentUser } = useSelector(s => s.auth)
	const { profile, loading, isProfileDeleted } = useSelector(state => state.profile)

	useEffect(() => {
		dispatch(getUserProfile(id))
	}, [id, dispatch])

	useEffect(() => {
		if (isProfileDeleted) {
			navigate("/login")
		}
	}, [isProfileDeleted, navigate])

	const resizeFile = async file => {
		let resized = null
		Resizer.imageFileResizer(
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

	// Handle Image Upload
	const handleImageUpload = e => {
		e.preventDefault()
		if (!file) return toast.error("no image provided")
		const formData = new FormData()
		formData.append("image", file)
		dispatch(uploadProfilePhoto(formData))
	}

	// Handle Delete Account
	const handleDeleteAccount = userId => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert your account!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "var(--dark-blue-color)",
			iconColor: "red",
			cancelButtonColor: "var(--red-color)",
			confirmButtonText: "Yes, delete it!",
		}).then(result => {
			if (result.isConfirmed) {
				dispatch(deleteProfile(userId))
				dispatch(logoutUser())
			}
		})
	}

	if (loading) {
		return (
			<div
				className="profile container"
				style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			>
				<GridLoader color="#36d7b7" size={30} />
			</div>
		)
	}

	return (
		<section className="profile container">
			<div className="profile-header">
				<div className="image">
					<img src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url} alt="" />

					{currentUser && (
						<>
							{id === currentUser?._id && (
								<form onSubmit={handleImageUpload}>
									<label htmlFor="file">
										<i className="bi bi-camera-fill"></i>
									</label>

									<input onChange={e => handleChangeImage(e)} type="file" name="file" id="file" />
									<button type="submit">Upload</button>
								</form>
							)}
						</>
					)}
				</div>

				<div className="user-wrapper">
					<div className="user-name">
						<div className="user">
							<h1>{profile?.username}</h1>
							<div className="user-date-joined">
								<strong>Date Joined: </strong>
								<span>{new Date(profile?.createdAt).toDateString()}</span>
							</div>
						</div>
					</div>

					<div className="profile-bio">
						{profile?.bio && profile?.bio.split("\n").map((line, i) => <p key={i}>{line}</p>)}
					</div>
				</div>

				{currentUser && (
					<div className="profile-controls">
						{currentUser?._id === id && (
							<button className="update" onClick={_ => setShowUpdateProfile(true)}>
								Update Profile
								<i className="bi bi-file-person-fill"></i>
							</button>
						)}
						{(currentUser?._id === id || currentUser.isAdmin) && (
							<button className="delete" onClick={() => handleDeleteAccount(profile?._id)}>
								Delete Account <i className="bi bi-trash-fill"></i>
							</button>
						)}
					</div>
				)}
			</div>

			<div className="profile-posts-list">
				{profile?.posts?.length > 0 ? (
					<>
						<h2>{profile?.username} Posts</h2>
						<PostsList posts={profile?.posts} />
					</>
				) : (
					<h3>{profile?.username} haven't any post</h3>
				)}
			</div>

			{showUpadteProfile === true && (
				<UpdateProfileModal profile={profile} closeModal={() => setShowUpdateProfile(false)} />
			)}
		</section>
	)
}

export default Profile
