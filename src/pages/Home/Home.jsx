import "./Home.scss"
import PostsList from "../../components/PostsList/PostsList"
import Categories from "../../components/Categories/Categories"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchPosts } from "../../redux/apiCalls/postApiCall"

const Home = () => {
	const dispatch = useDispatch()

	const { posts } = useSelector(s => s.post)

	useEffect(() => {
		dispatch(fetchPosts(1))
	}, [dispatch])

	return (
		<section className="home">
			<div className="welcome-background">
				<div className="overlay">
					<h1>Welcome To Blog</h1>
				</div>
			</div>

			<div className="content-layout container">
				<div className="latest-post-wrapper">
					<h3>Latest Posts</h3>
					<PostsList posts={posts} />

					<div className="posts-link">
						<Link to={"/posts"}>See All Posts</Link>
					</div>
				</div>

				<Categories />
			</div>
		</section>
	)
}

export default Home
