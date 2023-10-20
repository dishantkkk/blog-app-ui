import './App.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import 'bootstrap/dist/css/bootstrap.min.css'
import Services from './pages/Services'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserDashboard from './pages/user-routes/UserDashboard'
import PrivateRoute from './components/PrivateRoute'
import ProfileInfo from './pages/user-routes/ProfileInfo'
import PostPage from './pages/PostPage'
import UserProvider from './context/UserProvider'
import Categories from './pages/Categories'
import UpdateBlog from './pages/UpdateBlog'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/posts/:postId" element={<PostPage />} />
      <Route path="/categories/:categoryId" element={<Categories />} />
      <Route path="/user" element={<PrivateRoute />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="profile-info/:userId" element={<ProfileInfo />} />
        <Route path="update-blog/:blogId" element={<UpdateBlog />} />
      </Route>
    </Route>
  )
)
const App = () => {
  return (
    <UserProvider>
      <ToastContainer position="bottom-center" />
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
