import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { EmployeeNavbar } from "../components/EmployeeNavbar";
import { api } from "../config/axios";

export const CandidateViewProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getCandidateProfile = async () => {
      try {
        const response = await api.get("/api/job-portal/candidate/profile");

        console.log("Candidate profile:", response.data);

        setProfile(response.data);
      } catch (error) {
        console.log("Get candidate profile error:", error.response?.data);

        setError(error.response?.data?.message || "Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    getCandidateProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <EmployeeNavbar />

        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <EmployeeNavbar />

        <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
          <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Profile Not Set Up
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              You haven't completed your candidate profile yet. Complete it to apply for jobs.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>

              <button
                onClick={() => navigate("/candidate/edit-profile")}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      <EmployeeNavbar />

      <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
        <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
          
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold overflow-hidden">
              {profile?.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
            {user?.username}
          </h1>

          <p className="text-center text-gray-500 text-sm mb-6">{user?.role}</p>

         
          <div className="space-y-4">
            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Email</p>

              <p className="font-medium text-gray-700">{user?.email || "—"}</p>
            </div>

            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Phone</p>

              <p className="font-medium text-gray-700">
                {profile?.phone || "—"}
              </p>
            </div>

            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Experience</p>

              <p className="font-medium text-gray-700">
                {profile?.experience || "—"}
              </p>
            </div>

            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Skills</p>

              <p className="font-medium text-gray-700">
                {profile?.skills?.length ? profile.skills.join(", ") : "—"}
              </p>
            </div>

            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-400 mb-1">Resume</p>

              <p className="font-medium text-gray-700">
                {profile?.resume || "Not uploaded"}
              </p>
            </div>
          </div>

          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Back
            </button>

            <button
              onClick={() => navigate("/candidate/edit-profile")}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
