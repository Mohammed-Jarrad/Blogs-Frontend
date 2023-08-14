import "./Pagination.scss"

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
	const generatePages = Array.from({ length: pages }, (_, i) => i + 1) // like [1, 2, 3, 4, 5] if pages = 5

	return (
		<div className="pagination">
			<div
				className={`page previous ${currentPage === 1 ? "disable" : ""}`}
				onClick={e => {
					if (currentPage > 1) {
						setCurrentPage(p => p - 1)
					}
				}}
			>
				Previous
			</div>
			{generatePages.map(i => {
				return (
					<div
						className={`page ${currentPage === i ? "active" : ""}`}
						key={i}
						onClick={e => {
							setCurrentPage(i)
						}}
					>
						{i}
					</div>
				)
			})}
			<div
				className={`page next ${currentPage === pages ? "disable" : ""}`}
				onClick={e => {
					if (currentPage < pages) {
						setCurrentPage(p => p + 1)
					}
				}}
			>
				Next
			</div>
		</div>
	)
}

export default Pagination
