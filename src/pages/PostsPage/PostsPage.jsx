import PostsList from "../../components/PostsList/PostsList"
import "./PostPage.scss"
import Categories from "../../components/Categories/Categories"
import Pagination from "../../components/Pagination/Pagination"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchPosts, getPostsCounts } from "../../redux/apiCalls/postApiCall"

const POST_PER_PAGE = 3

const PostsPage = () => {
	const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState(1)
	const { postsCount, posts } = useSelector(s => s.post)

	const pages = Math.ceil(postsCount / POST_PER_PAGE)

	useEffect(() => {
		dispatch(fetchPosts(currentPage))
		window.scrollTo({ top: 0, left: 0, behavior: "auto" })
	}, [currentPage])

	useEffect(() => {
		dispatch(getPostsCounts())
	}, [])

	return (
		<>
			<Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage} />
			
			<section className="posts-page container">
				<PostsList posts={posts} />
				<Categories />
			</section>

			<Pagination currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage} />
		</>
	)
}

export default PostsPage
