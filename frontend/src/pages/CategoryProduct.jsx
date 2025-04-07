import { useParams } from "react-router-dom";

function CategoryProduct() {
  const { category } = useParams();

  

  return (
    <div>
      <h1>Products for category: {category}</h1>
      
    </div>
  );
}

export default CategoryProduct;
