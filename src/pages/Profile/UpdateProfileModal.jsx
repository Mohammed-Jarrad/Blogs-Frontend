import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { updateProfile } from "../../redux/apiCalls/profileApiCall"
import Modal from "../../components/Modal/Modal"

const UpdateProfileModal = ({ closeModal, profile }) => {
	const [username, setUsername] = useState(profile?.username)
	const [bio, setBio] = useState(profile?.bio || "")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()

	// form submit handler
	const formSubmitHandler = e => {
		e.preventDefault()

		const updatedUser = {
			username,
			bio,
		}

		if (password.trim() !== "") {
			updatedUser.password = password
		}

		if (!username.trim()) return toast.error("username is required")
		if (!bio.trim()) return toast.error("user bio is required")

		dispatch(updateProfile(profile._id, updatedUser))
		closeModal()
	}

	return (
		<Modal closeModal={closeModal}>
			<form onClick={e => e.stopPropagation()} onSubmit={formSubmitHandler}>
				<abbr title="close">
					<i className="bi bi-x-circle-fill close" onClick={closeModal}></i>
				</abbr>

				<h1>Update Profile</h1>

				<label htmlFor="">
					<span>Username</span>
					<input
						autoFocus
						type="text"
						defaultValue={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</label>

				<label htmlFor="">
					<span>Bio</span>
					<textarea defaultValue={bio} onChange={e => setBio(e.target.value)} rows={6} />
				</label>

				<label htmlFor="">
					<span>Password</span>
					<input
						type="password"
						defaultValue={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</label>

				<button type="submit">Edit Profile</button>
			</form>
		</Modal>
	)
}

export default UpdateProfileModal
