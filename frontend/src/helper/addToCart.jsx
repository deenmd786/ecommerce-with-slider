const addToCart = (e, id) => {
    e?.stopPropagation(); // Prevents the click from bubbling to parent elements
    e?.preventDefault(); // Prevents the click from bubbling to parent elements
    console.log(id); // Handle add to cart logic
};

export default addToCart