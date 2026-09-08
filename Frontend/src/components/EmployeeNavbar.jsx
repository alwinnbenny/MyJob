import { Bell } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { ProfileDropdown } from "./ProfileDropdown";

export const EmployeeNavbar = () => {
  const { user } = useContext(UserContext); 

  const [showProfile, setShowProfile] = useState(false);
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
            <div className="w-11 h-11 rounded-full overflow-hidden bg-red-500 text-white flex items-center justify-center font-semibold">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
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
