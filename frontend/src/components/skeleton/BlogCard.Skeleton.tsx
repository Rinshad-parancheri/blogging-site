const BlogCardSkeleton = () => {
  return (
    <div className="border-b border-slate-400 pb-10 flex flex-col pt-4 min-w-96 mb-6 animate-pulse">
      <div className="upperLine flex items-center">
        <div className="avatar">
          <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
        </div>
        <div className="author ml-3 w-24 h-6 bg-slate-200 rounded"></div>
        <div className="circle px-3">
          <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
        </div>
        <div className="date pl-1 w-24 h-6 bg-slate-200 rounded"></div>
      </div>
      <div className="tittle mt-4 w-full h-10 bg-slate-200 rounded "></div>
      <div className="content mt-4 w-full">
        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
      </div>
      <div className="timeTaken mt-9 w-24 h-4 bg-slate-200 rounded"></div>
    </div>
  );
};

export default BlogCardSkeleton;
