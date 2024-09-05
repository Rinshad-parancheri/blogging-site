import { useParams } from "react-router-dom"
import Appbar from "../components/Appbar"
import BlogReadMode from "../components/BlogReadMode"
import BlogReadModeSkeleton from "../components/skeleton/BlogReadMode.skeloton"
import { useBlog } from "../hooks"

const Blog = () => {
  let { id } = useParams()
  const { loading, blog } = useBlog({ id: id || '' })

  if (loading) {
    return (
      <div>
        <div className='appBarContaier'>
          <Appbar />
        </div>
        <BlogReadModeSkeleton />
      </div>
    )
  }


  return (
    <div>
      <Appbar publishBtn={true}></Appbar>
      <BlogReadMode tittle={blog.title}
        content={blog.content}
        author={blog.author.name}
        date={blog?.createdAt}
      ></BlogReadMode>
    </div>
  )
}

export default Blog
