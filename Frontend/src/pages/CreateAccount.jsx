import { ArrowRight, Eye, ChevronDown, EyeOff } from "lucide-react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { LoginNav } from "../components/LoginNav";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { api } from "../config/axios.js";

export const Createaccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "candidate",
    terms: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    terms: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    let isValid = true;
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      isValid = false;
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }
    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match.";
      isValid = false;
    }
    if (!formData.terms) {
      newErrors.terms = "You must accept the terms.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validate()) {
      return;
    }

    try {
      const response = await api.post("/api/job-portal/create-account", {
        fullname: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmpassword: formData.confirmpassword,
        role: formData.role,
      });

      console.log(response.data);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      // console.log("FULL ERROR:", error);
      // console.log("STATUS:", error.response?.status);
      // console.log("BACKEND MESSAGE:", error.response?.data);

      setServerError(error.response?.data?.message || "Something went wrong");
    }
  };
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <LoginNav>
      <div className="flex flex-col gap-6 mt-14 ">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[32px] font-semibold text-black">
              Create account.
            </h1>

            <p className="mt-2 gap-4 text-[#767F8C]">
              Already have account?{" "}
              <NavLink
                to="/sign-in"
                className="text-[#0A65CC] font-medium cursor-pointer"
              >
                Log In
              </NavLink>
            </p>
          </div>
          <div className="relative">
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="appearance-none w-37.5 h-12 mt-4 border border-gray-300 rounded-sm px-4 pr-10 outline-none text-[#5E6670]"
            >
              <option value="" disabled></option>
              <option value="employer">Employer</option>
              <option value="candidate">Candidate</option>
            </select>

            <ChevronDown
              size={18}
              className="absolute mt-2 right-4 top-1/2 -translate-y-1/2 text-[#767F8C] pointer-events-none"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Row */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="h-12 border border-secondary rounded-sm px-4 outline-none "
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="h-12 border border-secondary rounded-sm px-4 outline-none "
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
            </div>
            <div>
              {/* Email */}
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full h-12 border border-secondary rounded-sm px-4 outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full h-12 border border-secondary rounded-sm px-4 pr-12 outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={handlePassword}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-[#767F8C] cursor-pointer" />
                ) : (
                  <Eye size={20} className=" text-[#767F8C] cursor-pointer" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmpassword: e.target.value })
                }
                className="w-full h-14 border border-secondary rounded-sm px-4 pr-12 outline-none "
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={handlePassword}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-[#767F8C] cursor-pointer" />
                ) : (
                  <Eye size={20} className=" text-[#767F8C] cursor-pointer" />
                )}
              </button>
              {errors.confirmpassword && (
                <p className="text-red-500 text-xs">{errors.confirmpassword}</p>
              )}
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-3 text-[#767F8C] text-sm">
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#0A65CC]"
                checked={formData.terms}
                onChange={(e) =>
                  setFormData({ ...formData, terms: e.target.checked })
                }
              />

              <span>
                I've read and agree with your{" "}
                <span className="text-[#0A65CC] font-medium cursor-pointer">
                  Terms of Services
                </span>
              </span>
            </label>
            {serverError && (
              <p className="text-red-500 text-sm">{serverError}</p>
            )}
            {/* Button */}
            <button
              type="submit"
              className="w-full h-14 bg-[#0A65CC] text-white rounded-sm flex justify-center items-center gap-3 font-medium hover:bg-blue-700 transition cursor-pointer"
            >
              Create Account
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-4 py-1">
          <div className="flex-1 h-px bg-secondary" />
          <span className="text-[#767F8C] text-sm">or</span>
          <div className="flex-1 h-px bg-secondary" />
        </div>

        <div className="grid grid-cols-2 gap-5 mb-14">
          <button className="h-12 border border-secondary rounded-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition cursor-pointer">
            <FaFacebookF className="text-[#1877F2] text-xl" />
            <span className="text-[#5E6670]">Sign up with Facebook</span>
          </button>

          <button className="h-12 border border-secondary rounded-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition cursor-pointer">
            <FaGoogle className="text-[#1877F2] text-xl" />
            <span className="text-[#5E6670]">Sign up with Google</span>
          </button>
        </div>
      </div>
    </LoginNav>
  );
};
