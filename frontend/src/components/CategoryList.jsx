import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "../utils/api";
import CategoryShimmer from "../ui/CategoryShimmer";

function CategoryList() {
    const [categoryProduct, setCategoryProduct] = useState(() => {
        // Retrieve data from localStorage if available
        const cachedData = localStorage.getItem('categoryProducts');
        return cachedData ? JSON.parse(cachedData) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategoryProduct = async () => {
        if (categoryProduct.length > 0) return; // Fetch only if categoryProduct is empty

        setLoading(true);
        setError(null);
        
        try {
            const response = await fetchData('/product/get-oneProduct-category', 'GET');
            if (response && response.data) {
                setCategoryProduct(response.data); // Adjust based on response structure
                localStorage.setItem('categoryProducts', JSON.stringify(response.data)); // Cache in localStorage
            } else {
                setError("No products found");
            }
        } catch (err) {
            setError(err.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className="container mx-auto p-4  sm:p-4">
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <CategoryShimmer />
            ) : (
                <div className="flex items-center space-x-3 p-1 justify-between overflow-x-auto scrollbar-none">
                    {categoryProduct.length > 0 ? (
                        categoryProduct.map((product, index) => (
                            <Link 
                                key={index}
                                to={`/product-category/${product.category}`}
                                className="flex items-center justify-between flex-col cursor-pointer w-full h-full"
                            >
                                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-slate-200 flex items-center justify-center rounded-full overflow-hidden">
                                    <img
                                        src={product?.productImage?.[0]}
                                        alt={product?.category || "Product"}
                                        className="rounded-md p-3 h-full w-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                                    />
                                </div>
                                <p className="capitalize text-sm md:text-base mt-1">
                                    {product?.category}
                                </p>
                            </Link>
                        ))
                    ) : !loading && <p>No products available</p>}
                </div>
            )}
        </div>
    );
}

export default CategoryList;