

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { EmployeeNavbar } from "../components/EmployeeNavbar";
import { EmployeeSidebar } from "../components/EmployeeSidebar";
import { api } from "../config/axios";

export const EmployerProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("phone", phone);
      formData.append("company", company);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await api.post(
        "/api/job-portal/employer/complete-profile",
        formData
      );

      console.log("Employer profile:", response.data);

      alert("Employer profile created successfully");

      navigate("/Dashboard");
    } catch (error) {
      console.log(
        "Employer profile error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to create employer profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <EmployeeSidebar />

      <div className="flex-1">
        <EmployeeNavbar />

        <div className="flex justify-center p-8">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-8">

            <h1 className="text-3xl font-semibold mb-2">
              Employer Profile
            </h1>

            <p className="text-gray-500 mb-8">
              Complete your employer profile
            </p>

            {error && (
              <div className="mb-5 rounded-lg bg-red-100 px-4 py-3 text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

             

              <div className="flex flex-col items-center">

                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">

                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-semibold text-gray-500">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  )}

                </div>

                <label className="mt-4 cursor-pointer bg-blue-100 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-200 transition">
                  Upload Profile Picture

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {profileImage && (
                  <p className="text-sm text-gray-500 mt-2">
                    {profileImage.name}
                  </p>
                )}

              </div>

             

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  value={user?.username || ""}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
                />
              </div>

           

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
                />
              </div>

             

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>

                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter company name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

             

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

             

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A65CC] hover:bg-[#0857ad] text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
              >
                {loading
                  ? "Creating Profile..."
                  : "Create Profile"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
