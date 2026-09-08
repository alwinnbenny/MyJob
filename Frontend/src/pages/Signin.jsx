import { ArrowRight, Eye, ChevronDown, EyeOff } from "lucide-react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { LoginNav } from "../components/LoginNav";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { api } from "../config/axios";

export const Signin = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    login: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      login: "",
    });

    try {
      const response = await api.post("/api/job-portal/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login response", response.data);

      const user = response.data.user;
      const token = response.data.token;

      login(user, token);

      if (user.role === "employer") {
        console.log("Going to Dashboard");
        navigate("/Dashboard", { replace: true });
      } else if (user.role === "candidate") {
        console.log("Going to Candidate page");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log("Login error :", error.response?.data);

      setErrors({
        login: error.response?.data?.message || "something went wrong",
      });
    }

    // if (
    //   formData.email === employee.email &&
    //   formData.password === employee.password
    // ) {
    //   login(employee);
    //   navigate("/Dashboard",{replace : true});
    //   return;
    // }

    // if (
    //   formData.email === candidate.email &&
    //   formData.password === candidate.password
    // ) {
    //   login(candidate);
    //   navigate("/Candidates",{replace : true});
    //   return;
    // }

    //   setErrors({
    //     login: "Invalid email or Password",
    //   });
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <LoginNav>
      <div className="w-134 flex flex-col gap-6 ">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[32px] font-semibold text-black">Sign in</h1>

            <p className="mt-2 gap-4 text-[#767F8C]">
              Don't have account ?{" "}
              <NavLink
                to="/create-account"
                className="text-[#0A65CC] font-medium"
              >
                Create Account
              </NavLink>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              className="w-full h-12 border border-secondary rounded-sm px-4 outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
            </div>

            <div className="flex items-center justify-between text-[#767F8C] text-sm">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 accent-[#0A65CC]" />
                <span>Remember Me</span>
              </label>
              <NavLink
                to="/forgot-password"
                className="cursor-pointer font-semibold text-[#0A65CC] transition-colors"
              >
                Forgot Password
              </NavLink>
            </div>
            {errors.login && (
              <p className="text-sm text-red-500">{errors.login}</p>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full h-14 bg-[#0A65CC] text-white rounded-sm flex justify-center items-center gap-3 font-medium hover:bg-blue-700 transition cursor-pointer"
            >
              Sign In
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-secondary" />
          <span className="text-[#767F8C] text-sm">or</span>
          <div className="flex-1 h-px bg-secondary" />
        </div>

        <div className="grid grid-cols-2 gap-5 mb-14">
          <button className="h-12 border border-secondary rounded-sm flex items-center justify-center gap-3 hover:bg-blue-400 transition cursor-pointer">
            <FaFacebookF className="text-[#1877F2] text-xl" />
            <span className="text-[#5E6670]">Sign up with Facebook</span>
          </button>

          <button className="h-12 border border-secondary rounded-sm flex items-center justify-center gap-3 hover:bg-red-300 transition cursor-pointer">
            <FaGoogle className="text-[#1877F2] text-xl" />
            <span className="text-[#5E6670]">Sign up with Google</span>
          </button>
        </div>
      </div>
    </LoginNav>
  );
};
