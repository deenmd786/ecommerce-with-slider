import { useEffect, useRef, useState } from "react";
import fetchProductsByCategory from "../utils/fetchCategoryWiseProduct";
import CurrencyFormat from "../helper/currencyFormat";
import CustomButton from "./CustomButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HorizontalShimmer from "../ui/horizontalShimmer";
import PropTypes from "prop-types";
import addToCart from "../helper/addToCart";
import { Link } from "react-router-dom";

function HorizontalCardProduct({ category, heading }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const scrollRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchProductsByCategory(category);
    setLoading(false);
    setData(categoryProduct);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftButton(scrollRef.current.scrollLeft > 0);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <div className="container relative mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-3 md:gap-5 scrollbar-none overflow-x-auto cursor-pointer"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {showLeftButton && (
          <button
            onClick={scrollLeft}
            className="hidden p-2 rounded-full bg-white md:text-xl md:block absolute left-5 z-10"
          >
            <FaChevronLeft />
          </button>
        )}
        <button
          onClick={scrollRight}
          className="hidden p-2 rounded-full bg-white md:text-xl md:block absolute right-5 z-10"
        >
          <FaChevronRight />
        </button>

        {loading
          ? new Array(13)
              .fill(null)
              .map((_, index) => <HorizontalShimmer key={index} />)
          : data.map((product) => (
              <Link
                to={`/product-details/${product._id}`}
                key={product._id}
                className="w-full h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product?.productImage[0]}
                    alt={product.productName}
                    className="object-scale-down h-full transition-transform mix-blend-multiply duration-300 hover:scale-110"
                  />
                </div>
                <div className="px-4 py-2 grid">
                  <h2 className="font-medium text-base text-gray-900 md:text-lg line-clamp-1 overflow-hidden text-ellipsis">
                    {product?.productName}
                  </h2>
                  <p className="px-0 capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-2 pb-2">
                    <p className="text-red-600 font-medium">
                      {<CurrencyFormat value={product?.selling} />}
                    </p>
                    <p className="text-slate-500 line-through">
                      {<CurrencyFormat value={product?.price} />}
                    </p>
                  </div>
                  <CustomButton
                    onClick={(e) => addToCart(e, product?._id)}
                    name="Add To Cart"
                    className="text-sm py-2"
                  />{" "}
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
HorizontalCardProduct.propTypes = {
  category: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default HorizontalCardProduct;
