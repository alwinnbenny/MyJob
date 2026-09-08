import { useContext } from "react";
import {
  FaPhoneAlt,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export const Navbar = () => {

  const navLinks = [
  { name: "Home", path: "/" },
  { name: "Find Job", path: "/Findjob" },
  { name: "Employers", path: "/Employers" },
  { name: "Candidates", path: "/Candidates" },
  { name: "Pricing Plans", path: "/Pricing" },
  { name: "Customer Supports", path: "/Support" },
];
const navigate = useNavigate();
const {user} = useContext(UserContext)
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-100 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-11">

          {/* Left Menu Links */}
         <ul className="flex items-center gap-6 text-[13.5px]">
  {navLinks.map((link) => (
    <li key={link.path}>
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          `relative h-11 flex items-center font-medium transition-colors
          ${
            isActive
              ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`
        }
      >
        {link.name}
      </NavLink>
    </li>
  ))}
</ul>

          {/* Right Side  */}
          <div className="flex items-center gap-5 text-[13.5px] text-gray-500">
            {/* Phone */}
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-[12px]" />
              <span>+1-202-555-0178</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
              <img
                src="https://flagcdn.com/w40/us.png"
                alt="US Flag"
                className="w-5 h-3.5 object-cover "
              />
              <span>English</span>
              <FaChevronDown className="text-[10px]" />
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar — Logo, Search, Buttons */}
      
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-17 gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0 w-31.5 h-10 opacity-100 rotate-0">
          <img
            src="/logo.png"
            alt="MyJob Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-100 overflow-hidden flex-1 max-w-167 h-12.5">
       

          {/* Search Input */}
          <div className="flex items-center flex-1 px-4 gap-3">
            <FaSearch className="text-gray-400 text-[13px] shrink-0" />
            <input
              type="text"
              placeholder="Job title, keyword, company"
              className="outline-none w-full text-[13.5px] text-gray-700 bg-transparent"
            />
              
         

          </div>
           
        </div>
         {/* Country Selector */}
        <div className="flex items-center gap-2 px-4 py-3 border border-gray-200  shrink-0 cursor-pointer">
            <img
              src="https://flagcdn.com/w40/in.png"
              alt="India Flag"
              className="w-5 h-3.5 object-cover "
            />
            {/* <span className="text-[13.5px] text-gray-600">India</span> */}
            <select>
                <option>india</option>
                <option>US</option>

            </select>
            {/* <FaChevronDown className="text-gray-400 text-[10px]" /> */}
          </div>

        {/* Action Buttons */}
       <div className="flex items-center gap-3 shrink-0">
  {user ? (
    <button
      onClick={() =>
        navigate(
          user.role?.toLowerCase() === "candidate"
            ? "/candidate/view-profile"
            : "/view-profile"
        )
      }
      className="flex items-center gap-3 cursor-pointer"
    >
      
      <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-blue-600 font-semibold text-lg">
            {user.username?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      
      <span className="text-gray-700 font-medium">
        {user.username}
      </span>
    </button>
  ) : (
    <>
      <button
        className="border border-blue-600 text-blue-600 px-6 py-2 text-[13.5px] font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap cursor-pointer"
        onClick={() => navigate("/sign-in")}
      >
        Sign In
      </button>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-[13.5px] font-semibold transition-colors whitespace-nowrap cursor-pointer"
        onClick={() => navigate("/post-job")}
      >
        Post A Jobs
      </button>
    </>
  )}
</div>
      </div>
    </header>
  );
};