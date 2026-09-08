// import { useContext, useState } from "react";
// import { UserContext } from "../Context/UserContext";
// import { useNavigate } from "react-router-dom";
// import { EmployeeNavbar } from "../components/EmployeeNavbar";

// export const CandidateEditProfile = () => {
//   const { user, updateUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: user?.username || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     skills: user?.skills || "",
//     bio: user?.bio || "",
//     profileImage: user?.profileImage || "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         profileImage: URL.createObjectURL(file),
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedUser = {
//       ...user,
//       ...formData,
//     };

//     updateUser(updatedUser);
//     alert("Profile Updated Successfully!");
//     navigate("/candidate/view-profile");
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <EmployeeNavbar />
//       <div className="flex-1 bg-gray-100 p-8">
//         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
//           <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Avatar */}
//             <div className="flex flex-col items-center gap-3 mb-2">
//               <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-400 text-white flex items-center justify-center text-2xl font-bold">
//                 {formData.profileImage ? (
//                   <img src={formData.profileImage} alt="avatar" className="w-full h-full object-cover" />
//                 ) : (
//                   <span>{formData.username?.charAt(0).toUpperCase()}</span>
//                 )}
//               </div>
//               <label className="cursor-pointer text-sm text-blue-600 hover:underline">
//                 Upload Photo
//                 <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
//               </label>
//             </div>

//             <div>
//               <label className="font-medium">Username</label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-3 mt-2"
//               />
//             </div>

//             <div>
//               <label className="font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-3 mt-2"
//               />
//             </div>

//             <div>
//               <label className="font-medium">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-lg p-3 mt-2"
//               />
//             </div>

//             <div>
//               <label className="font-medium">Skills</label>
//               <input
//                 type="text"
//                 name="skills"
//                 value={formData.skills}
//                 onChange={handleChange}
//                 placeholder="e.g. React, Node.js, Python"
//                 className="w-full border border-gray-300 rounded-lg p-3 mt-2"
//               />
//             </div>

//             <div>
//               <label className="font-medium">Bio</label>
//               <textarea
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 rows={4}
//                 placeholder="Tell employers a bit about yourself..."
//                 className="w-full border border-gray-300 rounded-lg p-3 mt-2 resize-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
//             >
//               Save Changes
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { EmployeeNavbar } from "../components/EmployeeNavbar";
import { api } from "../config/axios";

export const CandidateEditProfile = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: "",
    experience: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [profileExists, setProfileExists] = useState(false);

 
useEffect(()=>{
   const getProfile = async () => {
      try {
        const response = await api.get("/api/job-portal/candidate/profile");

        const profile = response.data;

        setProfileExists(true);

        setFormData({
          username: user?.username || "",
          email: user?.email || "",
          phone: profile.phone || "",
          experience: profile.experience || "",
          skills: profile.skills?.join(", ") || "",
        });
      } catch (error) {
        
        if (error.response?.status !== 404) {
          setError(error.response?.data?.message || "Unable to load profile");
        }
      } finally {
        setLoading(false);
      }
    };

    getProfile();
},[])
   
  

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setError("");

    try {
      setSaving(true);

      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      
      const userResponse = await api.put("/api/job-portal/update-user", {
        username: formData.username,
        email: formData.email,
      });

      console.log("Updated user:", userResponse.data);

      
      const profilePayload = {
        phone: formData.phone,
        experience: formData.experience,
        skills: skillsArray,
      };

      const profileResponse = profileExists
        ? await api.put("/api/job-portal/candidate/update-profile", profilePayload)
        : await api.post("/api/job-portal/candidate/complete-profile", profilePayload);

      setProfileExists(true);

      console.log("Updated candidate profile:", profileResponse.data);

      updateUser(userResponse.data.user);

      alert("Profile Updated Successfully!");

      navigate("/candidate/view-profile");
    } catch (error) {
      console.log("Update profile error:", error.response?.data);

      setError(error.response?.data?.message || "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <EmployeeNavbar />

        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <EmployeeNavbar />

      <div className="flex-1 bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
          <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="font-medium">Username</label>
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
              <label className="font-medium">Email</label>
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
              <label className="font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 mt-2"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="font-medium">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. Fresher, 2 years"
                className="w-full border border-gray-300 rounded-lg p-3 mt-2"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="font-medium">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, MongoDB"
                className="w-full border border-gray-300 rounded-lg p-3 mt-2"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
