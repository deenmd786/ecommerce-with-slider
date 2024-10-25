
// upload image to cloudinary media 
const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_COUDINARY}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product_image");

  const dataResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await dataResponse.json();

  // Return the secure URL and public ID from Cloudinary response
  return { url: data.secure_url, publicId: data.public_id };
};

export default uploadImage;
