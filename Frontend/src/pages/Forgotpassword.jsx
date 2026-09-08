import { ArrowRight } from "lucide-react";
import { LoginNav } from "../components/LoginNav";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { api } from "../config/axios";

export const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotpassword = async () => {
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post("/api/job-portal/forgot-password", {
        email: email,
      });

      console.log(response.data);

      navigate("/reset-password", {
        state: {
          resetToken: response.data.resetToken,
        },
      });
    } catch (error) {
      console.log("Forgot password error:", error.response?.data);

      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginNav>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-[32px] font-semibold text-black">
            Forgot Password
          </h1>

          <p className="mt-2 gap-4 text-[#767F8C]">
            Go back to{" "}
            <NavLink
              to="/sign-in"
              className="text-[#0A65CC] font-medium cursor-pointer"
            >
              Sign In
            </NavLink>
          </p>
          <p className="mt-2 gap-4 text-[#767F8C]">
            Already have account?{" "}
            <NavLink
              to="/create-account"
              className="text-[#0A65CC] font-medium cursor-pointer"
            >
              Create Account
            </NavLink>
          </p>
        </div>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-100 border border-secondary rounded-sm px-4 outline-none"
          />

          {/* Button */}
          <button
            className="w-full h-12 bg-[#0A65CC] text-white rounded-sm flex justify-center items-center gap-3 font-medium hover:bg-blue-700 transition cursor-pointer"
            onClick={handleForgotpassword}
            disabled={loading}
          >
            Reset Password
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4 py-1">
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
