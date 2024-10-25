import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import productCategory from "../helper/productCategory";
import CustomButton from "../components/CustomButton";
import uploadImage from "../utils/uploadImage";
import DisplayImage from "../common/DisplayImage";
import SingleImageShimmer from "../ui/SingleImageShimmer";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import fetchData from "../utils/api";

function UploadProducts({ onClose, fetchFuc }) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
  const [loadingStates, setLoadingStates] = useState([]);
  const [isSelect, setIsSelect] = useState(false);

  const handleOnChange = ({ target: { name, value } }) =>
    setData((prevData) => ({ ...prevData, [name]: value }));

  const handleUploadProduct = async ({ target: { files } }) => {
    if (files.length === 0) {
      setIsSelect(false);
      return;
    }
    
    setIsSelect(true);
  
    // Set loading states only for the new files being uploaded
    const newLoadingStates = Array(files.length).fill(true);
    setLoadingStates((prevStates) => [...prevStates, ...newLoadingStates]); // Append to existing loading states
  
    const uploadedUrls = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const { url } = await uploadImage(file);
        uploadedUrls.push(url);
        handleImageLoad((prevStates) =>prevStates.length + i); // Use the index for the current upload
      } catch (error) {
        toast.error(`Failed to upload image ${i + 1}: ${error.message}`);
      }
    }
  
    setData((prevData) => ({
      ...prevData,
      productImage: [...prevData.productImage, ...uploadedUrls],
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetchData(
        "/product/upload-product",
        "POST",
        data,
        true
      );
      // for show updated data
      fetchFuc();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message); // Display the error message in a toast
    }

    // Reset the data state
    setData({
      productName: "",
      brandName: "",
      category: "",
      productImage: [],
      description: "",
      price: "",
      selling: "",
    });

    onClose(); // Close the form or modal
  };

  const handleImageLoad = (index) =>
    setLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prevData) => ({
      ...prevData,
      productImage: [...newProductImage],
    }));
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 inset-0 flex justify-center items-center max-sm:px-3 z-0 backdrop-blur-md">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-2xl max-h-[80%] overflow-hidden shadow-lg z-50 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl text-gray-800">Upload Product</h2>
          <CgClose
            size={24}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={onClose}
          />
        </div>
        <form
          className="grid px-2 gap-4 overflow-y-auto max-h-[60vh]"
          onSubmit={handleSubmit}
        >
          {/* Product Name */}
          <div className="flex flex-col">
            <label
              htmlFor="productName"
              className="mb-2 font-medium text-gray-700"
            >
              Product Name :
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Enter product name"
              value={data.productName}
              onChange={handleOnChange}
              className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring focus:ring-red-500"
              required
            />
          </div>

          {/* Brand Name */}
          <div className="flex flex-col">
            <label
              htmlFor="brandName"
              className="mb-2 font-medium text-gray-700"
            >
              Brand Name :
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Enter brand name"
              value={data.brandName}
              onChange={handleOnChange}
              className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring focus:ring-red-500"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="mb-2 font-medium text-gray-700"
            >
              Category :
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring focus:ring-red-500"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {productCategory.map((elem, index) => (
                <option key={index} value={elem.value}>
                  {elem.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image */}
          <div className="flex flex-col">
            <label
              htmlFor="productImage"
              className="mb-2 font-medium text-gray-700"
            >
              Product Image :
            </label>
            <div className="flex gap-2 sm:h-20 max-sm:flex-col">
              <label
                htmlFor="uploadImageInput"
                className="flex items-center justify-center cursor-pointer bg-gray-100 px-4 py-4 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                <FaCloudUploadAlt size={24} className="text-gray-500 mr-2" />
                <span className="text-gray-700">Upload Image</span>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                  accept="image/*"
                  multiple // Allow multiple file selection
                  required
                />
              </label>

              <div className="flex gap-2 max-sm:overflow-x-auto">
                {data.productImage.map((imgUrl, index) => (
                  <div key={index} className="relative shrink-0">
                    {loadingStates[index] && isSelect && <SingleImageShimmer />}{" "}
                    <div className="relative group">
                      <img
                        src={imgUrl}
                        alt={data?.productName}
                        className={`w-20 h-20 object-cover cursor-pointer rounded-lg shadow-lg ${
                          loadingStates[index] ? "invisible" : "visible"
                        }`}
                        onClick={() => {
                          setFullScreenImageUrl(imgUrl);
                          setOpenFullScreenImage(true);
                        }}
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageLoad(index)}
                      />
                      <div
                        className="absolute bottom-1 right-1 p-1 cursor-pointer hidden rounded-full text-white bg-red-600 group-hover:block"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-2 font-medium text-gray-700"
            >
              Description :
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleOnChange}
              className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring focus:ring-red-500 h-24"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="mb-2 font-medium text-gray-700">
              Price :
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleOnChange}
              className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring focus:ring-red-500"
              required
            />
          </div>

          {/* Selling Price */}
          <div className="flex flex-col">
            <label htmlFor="selling" className="mb-2 font-medium text-gray-700">
              Selling Price :
            </label>
            <input
              type="number"
              id="selling"
              name="selling"
              placeholder="Enter selling price"
              value={data.selling}
              onChange={handleOnChange}
              className="p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring focus:ring-red-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <CustomButton
              name="Upload Product"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
            />
          </div>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImageUrl}
        />
      )}
    </div>
  );
}

UploadProducts.propTypes = {
  onClose: PropTypes.func.isRequired,
  fetchFuc: PropTypes.func.isRequired,
};

export default UploadProducts;
