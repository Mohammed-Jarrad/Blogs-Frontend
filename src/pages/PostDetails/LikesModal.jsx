import { Link } from "react-router-dom"
import Modal from "../../components/Modal/Modal"

const LikesModal = ({ closeModal, likes }) => {
	return (
		<Modal closeModal={closeModal}>
			<div className="likes-wrapper">
				{likes?.map((like, index) => (
					<div className="like" key={like?._id}>
						<span>{index + 1}</span>
						<img src={like?.profilePhoto?.url} alt="" />
						<p>
							<Link to={`/profile/${like._id}`}>{like?.username}</Link>
							<i className="bi bi-hand-thumbs-up-fill"></i>
						</p>
					</div>
				))}
			</div>
		</Modal>
	)
}

export default LikesModal
