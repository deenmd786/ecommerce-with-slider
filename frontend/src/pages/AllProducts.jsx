import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import UploadProducts from "../components/UploadProducts";
import fetchData from "../utils/api";
import AdminProductCard from "../components/AdminProductCard";

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await fetchData("/product/get-product", "GET", null);
      setAllProduct(response?.data);
    } catch (error) {
      console.error(error.message); // Display the error message in a toast
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="p-3 bg-gray-100 min-h-[75vh]">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 bg-white p-2 sm:p-4 shadow-lg rounded-lg">
        <h2 className="text-md sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
          All Products
        </h2>
        <CustomButton
          onClick={() => setOpenUploadProduct(true)}
          name="Upload Product"
          className="bg-red-500 hover:bg-red-600 text-white text-[14px] text-center sm:px-4 sm:py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
        />
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProducts
          onClose={() => setOpenUploadProduct(false)}
          fetchFuc={getAllProducts}
        />
      )}

      {/* All products list */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4 max-h-[50vh] overflow-y-auto">
  {allProduct.map((product, index) => (
    <div key={index + "allProducts"} className="p-2">
      <AdminProductCard data={product} fetchFuc={getAllProducts} />
    </div>
  ))}
</div>

    </div>
  );
}

export default AllProducts;
