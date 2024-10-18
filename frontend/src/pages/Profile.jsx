import { useSelector } from 'react-redux';

const Profile = () => {
  // Access user details from the Redux store
  const user = useSelector((state) => state.user.user);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
        ) : (
          <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-300">
            <span className="text-2xl text-gray-500">👤</span>
          </div>
        )}
      </div>

      {/* User Details */}
      <h2 className="text-xl font-bold text-center">{user?.name || 'User Name'}</h2>
      <p className="text-gray-600 text-center">{user?.email || 'user@example.com'}</p>

      {/* Additional Information */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        <ul className="list-disc list-inside">
          {/* Add any additional information here */}
          <li>Location: {user?.location || 'N/A'}</li>
          <li>Joined: {user?.joinedDate || 'N/A'}</li>
          {/* Add more fields as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
