const deleteImage = async (publicId) => {
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_COUDINARY}/image/destroy`;
  
    const dataResponse = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: publicId,
        api_key: import.meta.env.VITE_CLOUDINARY_API_KEY, // Include your API key if necessary
      }),
    });
  
    const data = await dataResponse.json();
  
    // Check if the deletion was successful
    if (data.result === "ok") {
      return { message: "Image deleted successfully", publicId };
    } else {
      throw new Error("Failed to delete image: " + data.error.message);
    }
  };
  
  export default deleteImage;