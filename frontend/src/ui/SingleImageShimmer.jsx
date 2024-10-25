// SingleImageShimmer.jsx
const SingleImageShimmer = () => {
    return (
      <div className="w-20 h-20 animate-pulse bg-gray-200 rounded overflow-hidden">
        {/* Shimmer effect as a gradient */}
        <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse rounded " />
      </div>
    );
  };
  
  export default SingleImageShimmer;
  