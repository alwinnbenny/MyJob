import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../config/axios";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const resetToken = location.state?.resetToken;

  const handlePassword = async () => {
    setError("");

    if (!resetToken) {
      setError("invalid user");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/job-portal/reset-password", {
        token: resetToken,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      console.log(response.data);

      navigate("/sign-in");
    } catch (error) {
      console.log("Reset password error:", error.response?.data);

      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  return (
    <section className="w-screen h-screen bg-white overflow-hidden flex flex-col">
      <header className="w-full flex justify-center pt-6">
        <img src="/logo.png" alt="MyJob Logo" className="w-32 object-contain" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="w-full max-w-md px-2">
          <h1 className="text-[32px] font-semibold text-black ">
            Reset Password
          </h1>

          <p className="mt-2 text-[#767F8C]">
            Duis luctus interdum metus, ut consectetur ante consectetur sed.
            Suspendisse euismod viverra massa sit amet mollis.
          </p>
        </div>
        <div className="w-full max-w-md px-2 mt-6 space-y-4">
          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-12 border border-secondary rounded-sm px-4 pr-12 outline-none"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={viewPassword}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-[#767F8C] cursor-pointer" />
              ) : (
                <Eye size={20} className="text-[#767F8C] cursor-pointer" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 border border-secondary rounded-sm px-4 pr-12 outline-none"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={viewPassword}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-[#767F8C] cursor-pointer" />
              ) : (
                <Eye size={20} className="text-[#767F8C] cursor-pointer" />
              )}
            </button>
          </div>

          {/* Button */}
          <button
            className="w-full h-12 bg-[#0A65CC] text-white rounded-sm flex justify-center items-center gap-3 font-medium hover:bg-blue-700 transition cursor-pointer"
            onClick={handlePassword}
          >
            Reset Password
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
