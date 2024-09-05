import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import BlogCreateBtn from "./BlogCreateBtn";

const Appbar = ({ publishBtn = false }: {
  publishBtn?: Boolean;
}) => {

  let firstLetter = (localStorage.getItem("userName")?.[0].toUpperCase() || 'U');
  return (
    <div className="flex justify-between px-16 py-5 border-b mb-5">
      <Link to={'/blogs'}>
        <div className="leftPart flex flex-col justify-center">
          Medium
        </div>
      </Link>
      <div className="rightPart flex">
        {publishBtn ? <BlogCreateBtn /> : ''}
        <div className="ml-8">
          <Avatar authorFirstLetter={firstLetter} appBar />
        </div>
      </div>
    </div>
  )
}

export default Appbar
