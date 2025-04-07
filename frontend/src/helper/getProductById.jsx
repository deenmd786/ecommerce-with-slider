import fetchData from "../utils/api";

const fetchProductData = async (productId) => {
  try {
    const response = await fetchData(`/product/get-productById/${productId}`, 'GET');
    return response.data;
  } catch (error) {
    console.log("Fetch product data error:", error.message);
  }
};

export default fetchProductData;
