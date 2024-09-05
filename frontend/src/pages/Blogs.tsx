import { Link } from 'react-router-dom';
import Appbar from '../components/Appbar';
import BlogCard from '../components/BlogCard';
import { useBlogs } from '../hooks';
import BlogCardSkeleton from '../components/skeleton/BlogCard.Skeleton';


const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <div className='appBarContaier'>
          <Appbar />
        </div>
        <div className='flex  flex-col items-center  h-dvh'>
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      </div>
    )
  }


  return (
    <div>
      <div className='appBarContaier'>
        <Appbar publishBtn={true} />
      </div>
      <div className='flex  flex-col items-center  h-dvh cursor-pointer'>
        {
          blogs.map(blog => (
            <Link to={`/blog/${blog.id}`}>
              <BlogCard
                key={blog.id}
                content={blog.content}
                tittle={blog.title}
                author={blog.author.name}
                date={blog.createdAt}
              />
            </Link>
          ))
        }
      </div>
    </div >
  )
}

export default Blogs
