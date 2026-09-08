import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

export const EmployeeSidebar = () => {
  const { user } = useContext(UserContext);

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/Dashboard",
      roles: ["employer", "Candidate"],
    },
    {
      name: "Post Job",
      icon: PlusCircle,
      path: "/post-job",
      roles: ["employer"],
    },
    {
      name: "My Jobs",
      icon: BriefcaseBusiness,
      path: "/my-job",
      roles: ["employer", "Candidate"],
    },
    {
      name: "Applicants",
      icon: Users,
      path: "/applicants",
      roles: ["employer"],
    },
  ];
  if (!user) return null;

  return (
    <aside className="w-72 min-h-screen bg-grey-600 border-r border-gray-200 flex flex-col">
      <div>
        <div className="h-15 flex items-center justify-center">
          <header className="w-full flex justify-center pt-6 pb-4 bg-white">
            <NavLink to="/Dashboard">
              <img
                src="/logo.png"
                alt="MyJob Logo"
                className="w-32 object-contain"
              />
            </NavLink>
          </header>
        </div>

   <nav className="p-5 space-y-2">
  {menus
    .filter((menu) =>
      menu.roles
        .map((role) => role.toLowerCase())
        .includes(user.role?.toLowerCase())
    )
    .map((menu) => (
      <NavLink
        to={menu.path}
        key={menu.name}
        className="w-full flex items-center gap-3 p-3 rounded-xl hover:text-blue-600 transition text-gray-500"
      >
        <menu.icon size={22} className="text-blue-600" />
        {menu.name}
      </NavLink>
    ))}
</nav>
      </div>

      {/* <div className="p-5 mt-auto">
        <button
        onClick={()=> navigate("/")}
        className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-100">
          <LogOut size={22} />
          Logout
        </button>
      </div> */}
    </aside>
  );
};
