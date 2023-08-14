import React, { useEffect } from "react"
import "./Modal.scss"

const Modal = ({ children, closeModal }) => {
	useEffect(() => {
		const handelESC = e => e.keyCode === 27 && closeModal()

		window.addEventListener("keydown", handelESC)
		return () => {
			window.removeEventListener("keydown", handelESC)
		}
	}, [closeModal])

	function handleClickModal(e) {
		closeModal()
	}

	function handleClickModalWrapper(e) {
		e.stopPropagation()
	}

	return (
		<div className="modal" onClick={handleClickModal}>
			<h2>Press Esc to close</h2>

			<div className="modal-wrapper" onClick={handleClickModalWrapper}>
				<abbr title="close">
					<i className="bi bi-x-circle-fill close" onClick={closeModal}></i>
				</abbr>

				{children}
			</div>
		</div>
	)
}

export default Modal
