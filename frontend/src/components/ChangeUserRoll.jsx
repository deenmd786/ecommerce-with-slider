import { useState } from "react";
import { MdClose } from "react-icons/md"; // Importing close icon
import PropTypes from "prop-types"; // Import PropTypes
import UserRole from "../common/UserRole";
import CustomButton from "./CustomButton";
import fetchData from "../utils/api";
import { toast } from "react-toastify";

function ChangeUserRoll({ name, email, userId, role, onClose, callFuc }) {
  const [userRole, setUserRole] = useState(role); // Initialize with the passed role
  console.log('userRole ' , userRole);
  

  // Handle role change in the select dropdown
  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  // Handle form submit to update user role
  const handleSubmit = async () => {
    try {
        console.log('userRole ' , userRole);
      const response = await fetchData(
        '/auth/update-user', // Adjust this endpoint if necessary
        'POST', 
        { userId, role: userRole }, // Send user details and updated role in payload
        true
      );
      
      toast.success(response.message || 'User successfully updated');
      callFuc();
      onClose(); // Close the modal
    } catch (error) {
      console.log(error.message || 'User not updated!');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center capitalize items-center z-10 bg-slate-300 bg-opacity-60">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full mx-4 relative">
        <button
          onClick={onClose} // Call the onClose function when clicked
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <MdClose className="text-2xl hover:bg-slate-300" />
        </button>
        <h1 className="text-xl font-bold mb-4 text-center">Change User Role</h1>

        {/* Display user details */}
        <div className="mb-4">
          <p className="text-lg font-semibold">
            Name: <span className="font-normal">{name}</span>
          </p>
          <p className="text-lg font-semibold">
            Email: <span className="font-normal lowercase">{email}</span>
          </p>
        </div>

        {/* Select Role */}
        <div className="mb-6 flex justify-between">
          <label htmlFor="role" className=" text-lg mr-4">
            Role:
          </label>
          <select
            id="role"
            value={userRole}
            onChange={handleRoleChange}
            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          >
            {Object.values(UserRole).map((roleOption, index) => (
              <option key={index} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="">
          <CustomButton name="Update Role" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

// Prop types validation
ChangeUserRoll.propTypes = {
  name: PropTypes.string.isRequired, // Name is a required string
  email: PropTypes.string.isRequired, // Email is a required string
  role: PropTypes.string.isRequired, // Role is required as initial value for role state
  userId: PropTypes.string.isRequired, // userId is required to identify which user to update
  onClose: PropTypes.func.isRequired, // onClose is a required function
  callFuc: PropTypes.func.isRequired, // callFuc is a required function
};

export default ChangeUserRoll;
