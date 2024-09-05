import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import BlogEditor from './pages/BlogEditor'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path='/blog/new' element={<BlogEditor />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
