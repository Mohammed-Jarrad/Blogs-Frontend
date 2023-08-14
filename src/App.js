import Header from "./components/Header/Header.jsx"
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home/Home.jsx"
import Login from "./pages/Forms/Login.jsx"
import Signup from "./pages/Forms/Signup.jsx"
import PostsPage from "./pages/PostsPage/PostsPage.jsx"
import CreatePost from "./pages/CreatePost/CreatePost.jsx"
import AdminPage from "./pages/AdminPage/AdminPage.jsx"
import Footer from "./components/Footer/Footer.jsx"
import ScrollWhenRefresh from "./components/ScrollWhenRefresh/ScrollWhenRefresh.jsx"
import PostDetails from "./pages/PostDetails/PostDetails.jsx"
import { ToastContainer } from "react-toastify"
import Category from "./pages/CategoryPage/Category.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import AdminUsers from "./pages/AdminPage/AdminUsers.jsx"
import AdminPosts from "./pages/AdminPage/AdminPosts.jsx"
import AdminCategories from "./pages/AdminPage/AdminCategories.jsx"
import AdminComments from "./pages/AdminPage/AdminComments.jsx"
import AdminMain from "./pages/AdminPage/AdminMain.jsx"
import ForgetPassword from "./pages/Forms/ForgetPassword.jsx"
import ResetPassword from "./pages/Forms/ResetPassword.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx"
import { useSelector } from "react-redux"
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail.jsx"

function App() {
	const { user } = useSelector(state => state.auth)

	return (
		<BrowserRouter>
			<ToastContainer autoClose={4000} theme="dark" position="bottom-left" />

			<Header />

			<ScrollWhenRefresh>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={user ? <Navigate to={"/"} /> : <Login />} />
					<Route path="/signup" element={user ? <Navigate to={"/"} /> : <Signup />} />
					<Route
						path="/verify/:token"
						element={user ? <Navigate to={"/"} /> : <VerifyEmail />}
					/>
					<Route
						path="/forget-password"
						element={user ? <Navigate to={"/"} /> : <ForgetPassword />}
					/>
					<Route
						path="/reset-password/:userId/:token"
						element={user ? <Navigate to={"/"} /> : <ResetPassword />}
					/>
					<Route path="/profile/:id" element={<Profile />} />

					<Route path="posts">
						<Route index element={<PostsPage />} />
						<Route path="create-post" element={user ? <CreatePost /> : <Navigate to={"/"} />} />
						<Route path="details/:id" element={<PostDetails />} />
						<Route path="categories/:category" element={<Category />} />
					</Route>

					<Route
						path="admin-dashboard"
						element={user?.isAdmin ? <AdminPage /> : <Navigate to={"/"} />}
					>
						<Route path="" element={<AdminMain />} />
						<Route path="users" element={<AdminUsers />} />
						<Route path="posts" element={<AdminPosts />} />
						<Route path="categories" element={<AdminCategories />} />
						<Route path="comments" element={<AdminComments />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</ScrollWhenRefresh>

			<Footer />
		</BrowserRouter>
	)
}

export default App
