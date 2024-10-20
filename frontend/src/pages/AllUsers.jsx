import { useEffect, useState } from "react";
import fetchData from "../utils/api";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import Shimmer from "../ui/AllUserShimmer";
import ChangeUserRoll from "../components/ChangeUserRoll";

function AllUsers() {
  const [allUserData, setAllUserData] = useState([]);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user

  // Fetch all user data
  const getAllUserDetail = async () => {
    try {
      const allUser = await fetchData("/auth/all-user-detail", "GET", null, true);
      setAllUserData(allUser); // Set the fetched data into state
      setLoading(false); // Stop loading when data is fetched
    } catch (error) {
      console.error(error.message || "Data Fetching Error");
      setLoading(false); // Stop loading even if there's an error
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getAllUserDetail();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user for updating
    setOpenUpdateUser(true); // Open the update modal
  };

  const handleCloseUpdate = () => {
    setOpenUpdateUser(false); // Close the update modal
    setSelectedUser(null); // Clear the selected user
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">All Users</h2>

      {/* Show shimmer while loading */}
      {loading ? (
        <Shimmer />
      ) : (
        // Display table if user data is available
        <div className="overflow-x-auto capitalize">
          <table className="w-full table-auto border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border px-2 py-2 md:px-4 md:py-2">Sr.</th>
                <th className="border px-2 py-2 md:px-4 md:py-2">Profile</th>
                <th className="border px-2 py-2 md:px-4 md:py-2">Name</th>
                <th className="border px-2 py-2 md:px-4 md:py-2">Email</th>
                <th className="border px-2 py-2 md:px-4 md:py-2">Role</th>
                <th className="border px-2 py-2 md:px-4 md:py-2">Created Date</th>
                <th className="border px-2 py-2 md:px-4 md:py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allUserData.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="border px-2 py-2 md:px-4 md:py-2">{index + 1}.</td>
                  <td className="border px-2 py-2 md:px-4 md:py-2">
                    <img src={user.profilePic} className="w-12 h-12 rounded-full" alt="Profile" />
                  </td>
                  <td className="border px-2 py-2 md:px-4 md:py-2">{user.name}</td>
                  <td className="border px-2 py-2 md:px-4 md:py-2 lowercase">{user.email}</td>
                  <td className="border px-2 py-2 md:px-4 md:py-2">{user.role || "GENERAL"}</td>
                  <td className="border px-2 py-2 md:px-4 md:py-2">
                    {moment(user.createdAt).format("l")}
                  </td>
                  <td className="border text-lg text-center py-2 md:px-4 md:py-2">
                    <button
                      className="px-3 py-1 md:px-4 md:py-2 cursor-pointer hover:text-white hover:bg-red-600"
                      onClick={() => handleEditClick(user)} // Call the handleEditClick with the user
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {openUpdateUser && selectedUser && (
            <ChangeUserRoll
              userId= {selectedUser._id}
              role= {selectedUser.role}
              name={selectedUser.name}
              email={selectedUser.email}
              onClose={handleCloseUpdate} // Pass the handleClose function to ChangeUserRoll
              callFuc = {getAllUserDetail}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AllUsers;
