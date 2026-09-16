import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../config/axios";
import { useEffect } from "react";

export const ProfileDropdown = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const role = user?.role?.toLowerCase();

        if (role === "employer") {
          const response = await api.get("/api/job-portal/employer/profile");
          setProfileImage(response.data?.profile?.profileImage || null);
        } else if (role === "candidate") {
          const response = await api.get("/api/job-portal/candidate/profile");
          setProfileImage(response.data?.profileImage || null);
        }
      } catch {
        setProfileImage(null);
      }
    };

    if (user) fetchProfileImage();
  }, [user]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isLoggedIn");
    navigate("/sign-in", { replace: true });
  };

  return (
    <div className="absolute right-0 top-14 w-72 bg-white rounded-xl shadow-xl  z-50">
      <div className="p-5 ">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-400 text-white flex items-center justify-center text-xl font-semibold">
            {profileImage ? (
              <img
                src={profileImage}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{user?.username?.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <div>
            <h2 className="font-semibold text-lg">{user?.username}</h2>

            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* <button
        onClick={() => {
          setShowProfile(false);
          navigate("/employee/edit-profile");
        }}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-300"
      >
        <Pencil size={18} />
        Edit Profile
      </button> */}

      <button
        onClick={() =>
          navigate(
            user?.role?.toLowerCase() === "candidate"
              ? "/candidate/view-profile"
              : "/view-profile",
          )
        }
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-300"
      >
        <User size={18} />
        View Full Profile
      </button>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-200"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};
