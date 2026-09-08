import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { EmployeeNavbar } from "../components/EmployeeNavbar";
import { api } from "../config/axios";

export const EditProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: "",
    company: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [error, setError] = useState("");

  // Get employer profile from database
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          "/api/job-portal/employer/profile"
        );

        console.log("Employer profile:", response.data);

        const profile = response.data.profile;

        setFormData((prev) => ({
          ...prev,
          phone: profile.phone || "",
          company: profile.company || "",
        }));

        setProfileExists(true);
      } catch (error) {
        console.log(
          "Get employer profile error:",
          error.response?.data || error.message
        );

        // Profile doesn't exist yet
        if (error.response?.status === 404) {
          setProfileExists(false);
        } else {
          setError(
            error.response?.data?.message ||
              "Failed to load employer profile"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.phone || !formData.company) {
      setError("Phone and company are required");
      return;
    }

    try {
      setSaving(true);

      let response;

      if (profileExists) {
        // Update existing profile
        response = await api.put(
          "/api/job-portal/employer/update-profile",
          {
            phone: formData.phone,
            company: formData.company,
          }
        );
      } else {
        // Create profile for the first time
        response = await api.post(
          "/api/job-portal/employer/complete-profile",
          {
            phone: formData.phone,
            company: formData.company,
          }
        );

        setProfileExists(true);
      }

      console.log("Employer profile response:", response.data);

      alert(
        profileExists
          ? "Profile Updated Successfully!"
          : "Profile Created Successfully!"
      );

      navigate("/Dashboard");
    } catch (error) {
      console.log(
        "Employer profile error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Something went wrong while saving profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <EmployeeNavbar />

      <div className="flex-1 bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">

          <h1 className="text-3xl font-bold mb-8">
            Edit Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Profile Image */}
            <div className="flex flex-col items-center gap-3 mb-2">

              <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-400 text-white flex items-center justify-center text-2xl font-bold">

                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {formData.username
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>
                )}

              </div>

              <label className="cursor-pointer text-sm text-blue-600 hover:underline">
                Upload Photo

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

            </div>

            {/* Username */}
            <div>
              <label className="font-medium">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mt-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mt-2"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-lg p-3 mt-2"
              />
            </div>

            {/* Company */}
            <div>
              <label className="font-medium">
                Company
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full border border-gray-300 rounded-lg p-3 mt-2"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700  text-white px-8 py-3 rounded-lg"
            >
              {saving
                ? "Saving..."
                : profileExists
                ? "Update Profile"
                : "Create Profile"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};