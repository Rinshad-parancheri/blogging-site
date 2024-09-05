import Avatar from "./Avatar"
import Blog from "./shared/interfaces/blog.interface"

const BlogReadMode = ({ author, date, tittle, content }: Blog) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-12 max-w-screen-2xl pt-20 px-10 w-full">

        <div className=" col-span-8">
          <div className="title text-6xl font-extrabold">
            {tittle}
          </div>
          <div className="publisedDate mt-3 text-lg text-slate-600">
            {`posted on ${dateSetting(date)}`}
          </div>
          <div className="content text-xl mt-4  text-gray-500">
            {content}
          </div>
        </div>
        <div className="col-span-4 pt-3 ml-10">
          <div className="text-lg font-medium">
            Author
          </div>
          <div className=' flex mt-5'>
            <div className="self-center flex flex-col justify-between">
              <Avatar authorFirstLetter={author[0]}></Avatar>
            </div>
            <div className=" ml-7">
              <div className="font-bold text-2xl ">
                {`${author[0].toUpperCase()}${author.slice(1, author.length)}`}
              </div>
              <div className="mt-2 text-lg text-gray-500">
                catch phrase of the user to get the attention from the reader in the blogging site
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function dateSetting(dateString: string) {
  let date = new Date(dateString).toDateString()

  return date.slice(4, date.length).split(' ').join(",")
}


export default BlogReadMode
