// Shimmer.js
const AllUserShimmer = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex justify-between bg-gray-200 p-4 rounded-lg">
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUserShimmer;
