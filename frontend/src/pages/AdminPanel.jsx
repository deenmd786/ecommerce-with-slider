import { FaUser } from "react-icons/fa";
import "../App.css";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);  

  return (
    <div className="min-h-[75vh] flex tracking-wider">
      <aside className="min-w-[50%] bg-slate-300 md:min-w-[20%]  sticky top-0 custom-shadow">
        <div className="  shadow-black shadow-[4px 0 10px rgba(0,0,0,0.2)]">
          <div className="h-36 flex text-white flex-col capitalize items-center justify-center bg-gray-900">
            <div className="space-x-2 shadow-sm rounded-full text-white cursor-pointer border-2 hover:border-gray-400 border-white p-1">
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-12 h-12 md:w-15 md:h-15 rounded-full"
                />
              ) : (
                <FaUser className="text-xl md:text-4xl m-2 md:m-4" />
              )}
            </div>
            <p className="mt-3 mx-2 text-[16px] md:text-xl text-wrap">{user.name}</p>
            <p className="mt-3 mx-2 text-[12px] md:text-md text-normal">{user.role}</p>
          </div>
          <nav className="grid text-gray-900 p-3 text-[16px] md:text-lg">
            <Link to="/admin-panel/all-users">All Users</Link>
            <Link to="/admin-panel/all-products">All Products</Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        {/* Outlet to render the nested routes */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
