
const BlogReadModeSkeleton = () => {
  return (
    <div className="flex justify-center animate-pulse">
      <div className="grid grid-cols-12 max-w-screen-2xl pt-20 px-10 w-full">
        <div className="col-span-8">
          <div className="title h-16 bg-gray-300 rounded-lg"></div>
          <div className="publisedDate mt-3 h-6 w-48 bg-gray-300 rounded-lg"></div>
          <div className="content mt-4">
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          </div>
        </div>
        <div className="col-span-4 pt-3 ml-10">
          <div className="h-6 w-24 bg-gray-300 rounded-lg mb-5"></div>
          <div className="flex mt-5">
            <div className="flex flex-col justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
            <div className="ml-7 flex-1">
              <div className="h-8 bg-gray-300 rounded w-10 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-8 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogReadModeSkeleton;
