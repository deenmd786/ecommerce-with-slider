import { FaUser } from "react-icons/fa";
import "../App.css";
import { useSelector } from "react-redux";
function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="min-h-[75vh] flex ">
      {" "}
      {/* Adjusted height to subtract header */}
      <aside className=" h-full w-[50%] max-w-60 shadow-black shadow-[4px 0 10px rgba(0,0,0,0.2)]">
        <div className="h-36 flex items-center justify-center bg-gray-900">
          <div className="space-x-2 shadow-sm rounded-full text-white cursor-pointer border-2 hover:border-gray-400 border-white p-5 ">
            {user ? (
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-9 h-9 md:w-11 md:h-11 rounded-full"
              />
            ) : (
              <FaUser className="text-4xl" />
            )}
          </div>
        </div>
      </aside>
      <main className="flex-1">main</main>
    </div>
  );
}

export default AdminPanel;
