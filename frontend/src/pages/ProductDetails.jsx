import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchProductData from "../helper/getProductById";
import CustomButton from "../components/CustomButton";
import PropTypes from "prop-types";
import ProductShimmer from "../ui/productShimmer";
import StarRating from "../helper/StarRating";
import CurrencyFormat from "../helper/currencyFormat";
import VerticalCardProduct from "../components/VerticalCardProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showFullHeading, setShowFullHeading] = useState(false);
  const [showFullDes, setShowFullDes] = useState(false);
  const [imgZoom , setImgZoom ] = useState(false);
  const [ zoomImageCoordinate, setZoomImageCoordinate ] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductData(id);
        if (data) {
          setSelectedImage(data.productImage[0]);
          setProductData(data);
        }
      } catch (error) {
        console.log("Error fetching product:", error.message);
      }
    };
    fetchProduct();
  }, [id]);

  
  const handleZoomImage = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("coordinates", left, top, width, height);

    const x = (e.clientX - left) / width;  // Normalize by dividing by width
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate(
      {
        x,
        y
      }
    )
    
  }

  if (!productData) return <ProductShimmer />;

  return (
    <div className="container  px-4 mx-auto">
      <div className=" flex md:max-h-[73vh] flex-col md:flex-row items-center justify-between pb-8 p-4 bg-white">
        {/* Left Side - Large Image and Thumbnails */}
        <div className="flex flex-col md:flex-row-reverse items-center w-full md:w-1/2 p-4 md:p-8">
          <div className="mx-2 bg-slate-200 rounded-lg w-full h-56 md:h-80 lg:h-[400px] flex justify-center items-center p-4 relative">
            <img
              src={selectedImage}
              alt={productData?.productName}
              className="object-scale-down w-full h-full rounded-lg" // Use object-contain to maintain aspect ratio
              onMouseMove={handleZoomImage}
              onMouseEnter={()=>setImgZoom(true)}
              onMouseLeave={()=>setImgZoom(false)}
              
            />
            {/* product zoom */}
            { imgZoom && (<div className="hidden lg:block absolute min-w-[400px] min-h-[400px] bg-slate-200 -right-[420px]  ">
              <div className="w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply"
                style={{
                  background: `url(${selectedImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '200%', 
                  backgroundPosition: `${zoomImageCoordinate.x *100}% ${zoomImageCoordinate.y *100}%`, 
                }}>
              </div>
            </div>)}
          </div>

          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-styled w-full md:w-auto md:h-80 lg:h-[400px] p-2">
            {productData.productImage.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product thumbnail ${index + 1}`}
                className="w-20 h-20 md:w-28 md:h-28 rounded object-scale-down cursor-pointer border-2 border-gray-200 hover:border-blue-500"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Product Information */}
        <div className="w-full md:w-1/2 flex flex-col items-start p-4 ">
          <p className="text-lg md:text-xl py-2 bg-gray-900 rounded-full text-white px-4 w-2/3 md:w-1/3 mb-2 md:mb-4">
            {productData.brandName}
          </p>
          <h1
            onClick={() => setShowFullHeading(!showFullHeading)}
            className={`text-xl md:text-3xl font-semibold mb-1 md:mb-2 ${
              !showFullHeading ? "line-clamp-1" : ""
            }`}
          >
            {productData.productName}
          </h1>

          <p className="text-lg text-gray-600 mb-1 md:mb-4">
            Category: {productData.category}
          </p>
          <StarRating rating={4.5} />
          <p
            onClick={() => setShowFullDes(!showFullDes)}
            className={`text-sm md:text-base text-gray-700 mb-1 md:mb-4 ${
              !showFullDes ? "line-clamp-2" : ""
            }`}
          >
            {productData.description}
          </p>
          <div className="flex flex-col-reverse md:flex-row gap-4 mb-4">
            <p className="text-lg md:text-2xl text-green-600 font-semibold mb-4">
              Selling Price: <CurrencyFormat value={productData.selling} />
            </p>
            <p className="text-lg md:text-lg font-bold mb-2 line-through">
              Price: <CurrencyFormat value={productData.price} />
            </p>
          </div>
          <div className="flex w-full gap-3 ">
            <CustomButton
              onClick={() => alert("clicked")}
              name="Buy"
              className="text-lg font-semibold py-2 w-1/2 border-2 border-red-600 hover:text-red-600 hover:bg-white transition-all duration-300"
            />
            <CustomButton
              onClick={() => alert("clicked")}
              name="Add To Cart"
              className="!text-red-600 text-lg font-semibold py-2 w-1/2 bg-white border-2 border-red-600 hover:!text-white transition-all duration-300"
            />
          </div>
        </div>
      </div>
      <VerticalCardProduct  
  heading={<span>Explore More in <span className="capitalize">{productData.category}</span></span>} 
  category={productData.category} 
/>
    </div>
  );
};

ProductDetail.propTypes = {
  productData: PropTypes.shape({
    productName: PropTypes.string,
    brandName: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    selling: PropTypes.number,
    productImage: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ProductDetail;
