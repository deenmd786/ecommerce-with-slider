import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import fetchData from "../utils/api";
import { toast } from "react-toastify";
import convertToBase64 from "../components/Bash64Image";

const Signup = () => {
  const navigate = useNavigate();

  // Using one state object for all form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Function to handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the relevant field in the object
    }));
  };

  // Function to handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await convertToBase64(file);
      setFormData((prevData) => ({
        ...prevData,
        profilePic: base64Image, // Save base64 profilePic in state
      }));
    }
  };

  // Signup function
  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, profilePic } = formData;

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Send signup data with profile image (if provided)
      const response = await fetchData("/auth/register", "POST", {
        name,
        email,
        password,
        profilePic, // Send base64 profile image as profile picture
      });

      if (response.message && response.message !== "User already exists") {
        setError(response.message);
      } else {
        toast.success("Sign Up Successful!");
        navigate("/login");
        console.log("Signing up with:", { name, email, password });
      }
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex p-3 h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex flex-col items-center justify-center md:mb-6">
          <div className="border-2 border-gray-950 rounded-full w-24 h-24 flex items-center justify-center relative overflow-hidden">
            {formData.profilePic ? (
              <img src={formData.profilePic} alt="Profile" />
            ) : (
              <FaUser className="text-5xl text-gray-700" />
            )}
            <span className="absolute bottom-0 left-0 w-full text-center text-sm text-black font-bold bg-slate-300 py-1 opacity-70">
              Upload
              <input
                type="file"
                className="opacity-0 absolute inset-0 cursor-pointer"
                onChange={handleImageUpload}
                accept="image/*" // Accept only image files
              />
            </span>
          </div>

          <h2 className="text-2xl font-bold">Sign Up</h2>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="flex justify-center mb-4">
            <CustomButton name="Sign Up" type="submit" />
          </div>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
