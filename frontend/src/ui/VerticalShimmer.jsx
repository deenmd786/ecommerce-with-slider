// VerticalShimmer.js
import "./shimmer_css/horizontal.css";
function VerticalShimmer() {
  return (
    <div className="min-w-[150px] md:min-w-[250px] max-w-[150px] md:max-w-[250px] h-full bg-white rounded-sm shadow animate-pulse">
      <div className="bg-gray-300 h-36 w-full rounded-sm mb-4"></div>
      <div className="space-y-2 p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="flex space-x-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
}

export default VerticalShimmer;
