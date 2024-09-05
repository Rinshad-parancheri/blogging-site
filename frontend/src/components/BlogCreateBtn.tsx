import { Link } from 'react-router-dom'

const BlogCreateBtn = () => {
  return (
    <div> <Link to={"/blog/new"}>
      <div>
        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New blog</button>
      </div >
    </Link> </div>
  )
}

export default BlogCreateBtn
