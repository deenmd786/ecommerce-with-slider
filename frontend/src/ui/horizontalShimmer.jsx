// HorizontalShimmer.js
import './shimmer_css/horizontal.css'
const HorizontalShimmer = () => {
  return (
    <div className="flex items-center w-full h-36 bg-white animate-pulse rounded-sm shadow">
      <div className="bg-slate-100 h-full p-4 min-w-[120px] md:min-w-[145px] shimmer"></div>
      <div className="flex-1 p-4">
        <div className="h-5 bg-slate-100 rounded mb-2 shimmer"></div>
        <div className="h-4 bg-slate-100 rounded mb-1 shimmer"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-slate-100 rounded shimmer w-20"></div>
          <div className="h-6 bg-slate-100 rounded line-through shimmer w-16"></div>
        </div>
        <div className="h-10 bg-slate-100 rounded mt-2 shimmer w-36"></div>
      </div>
    </div>
  );
};

export default HorizontalShimmer;
