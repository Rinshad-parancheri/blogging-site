import Appbar from "../components/Appbar"
import Editor from "../components/Editor"

const BlogEditor = () => {
  return (
    <div>
      <div>
        <Appbar />
      </div>

      <div className="flex flex-col items-center mt-16">
        <Editor />
      </div>
    </div>
  )
}

export default BlogEditor
