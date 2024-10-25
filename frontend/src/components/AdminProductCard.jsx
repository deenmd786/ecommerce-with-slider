import PropTypes from "prop-types";
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import CurrencyFormat from "../helper/currencyFormat"; // Import the CurrencyFormat component
import DisplayImage from "../common/DisplayImage";
import { toast } from "react-toastify";

function AdminProductCard({ data, fetchFuc }) {
  const [editProduct, setEditProduct] = useState(false);
  const [fullImage, setFullImage] = useState(false);
  const [fullImageUrl, setFullImageUrl] = useState('');

  return (
    <div className="bg-white max-sm:min-w-[50vw]  max-h-fit rounded"> 
      <div className="p-2">
        {/* Product Image */}
        <img
          src={data?.productImage?.[0] || "https://via.placeholder.com/120"}
          width={120}
          height={120}
          alt={data?.productName || "Product Image"}
          className="mx-auto min-w-38 min-h-38 object-cover cursor-pointer rounded border-2 hover:border-green-400"
          onClick={()=>{
            setFullImage(true);
            setFullImageUrl(data?.productImage?.[0] || toast.error('Image not available.'))
          }}
        />
        {/* Product Name */}
        <h1 className="text-center font-medium sm:text-md mt-2">{data?.productName}</h1>
        
        {/* Product Price */}
        <p className="text-center mt-1 font-semibold text-gray-600">
          <CurrencyFormat value={data?.price || 0} /> {/* Display the formatted price */}
        </p>

        {/* Edit Button */}
        <div
          className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 cursor-pointer rounded-full text-gray-900 hover:text-white"
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline />
        </div>

        {editProduct && (
          <AdminEditProduct
            onClose={() => setEditProduct(false)}
            importData={data}
            fetchFuc={fetchFuc}
          />
        )}
      </div>
      {
        fullImage && (<DisplayImage onClose={()=>setFullImage(false)} imgUrl={fullImageUrl} />)
      }
    </div>
  );
}

// Adding PropTypes for validation
AdminProductCard.propTypes = {
  data: PropTypes.shape({
    productImage: PropTypes.arrayOf(PropTypes.string),
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, // Add price field to PropTypes
  }).isRequired,
  fetchFuc: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  clickData: PropTypes.func.isRequired
};

export default AdminProductCard;
