const Settings = () => {
    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Account Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    );
  };
  
  export default Settings;
  