// CategoryShimmer.js
import './shimmer_css/CategoryShimmer.css';

const CategoryShimmer = () => {
    return (
        <div className="flex items-center space-x-3 p-1 justify-between overflow-x-auto scrollbar-none">
            {[...Array(12)].map((_, index) => (
                <div key={index} className="flex items-center justify-between flex-col w-full h-full">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 xl:w-18 xl:h-18 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-10 h-4 mt-2 bg-gray-200 animate-pulse rounded"></div>
                </div>
            ))}
        </div>
    );
};

export default CategoryShimmer;