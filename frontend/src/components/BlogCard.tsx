import Avatar from "./Avatar";
import Circle from "./Circle";
import Blog from "./shared/interfaces/blog.interface";



const BlogCard = ({ author, date, tittle, content }: Blog) => {
  return (
    < div className="border-b border-slate-400 pb-1 flex flex-col pt-4 w-[36rem]   mb-6" >
      <div className="upperLine flex  items-center ">
        <div className="avatar">
          <Avatar authorFirstLetter={author[0]}></Avatar>

        </div>
        <div className="author pl-2 text-xl">
          {`${author[0].toUpperCase()}${author.slice(1, author.length)}`}
        </div>
        <div className="circle px-3">
          <Circle></Circle>
        </div>
        <div className="date pl-1  font-light text-xl">
          {`${dateSetting(date)}`}
        </div>

      </div>
      <div className="tittle mt-2 font-bold text-3xl">
        {tittle}
      </div>
      <div className="content mt-1 text-xl font-normal">
        {content.length > 150 ? `${content.slice(0, 150)}...` : content
        }
      </div>
      <div className="timeTaken pt-9 text-base text-slate-500">
        {Math.ceil(content.length / 100) + " min read"}
      </div>
    </div >
  )
}


function dateSetting(dateString: string) {
  let date = new Date(dateString).toDateString()

  return date.slice(4, date.length).split(' ').join(",")
}



export default BlogCard
