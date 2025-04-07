import fetchData from "./api";

const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetchData('/product/get-allProductsby-category', 'GET', null);
      if (response && response.data) {
        return response.data[category];
      } else {
        console.log("No products found for this category");
        return [];
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };

  export default fetchProductsByCategory;