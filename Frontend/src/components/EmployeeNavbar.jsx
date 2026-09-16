import { Bell } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { ProfileDropdown } from "./ProfileDropdown";
import { api } from "../config/axios";

export const EmployeeNavbar = () => {
  const { user } = useContext(UserContext);

  const [showProfile, setShowProfile] = useState(false);
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

  return (
    <header className="h-17.5 bg-white flex items-center justify-between px-8">
      <div>
        <h2 className="text-3xl font-semibold text-black">Job Portal</h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500">
          <Bell size={25} />
          <span className="absolute -top-1 -right-1 h-3 w-3 "></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden bg-blue-500 text-white flex items-center justify-center font-semibold">
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
          </button>

          {showProfile && <ProfileDropdown setShowProfile={setShowProfile} />}
        </div>
      </div>
    </header>
  );
};
