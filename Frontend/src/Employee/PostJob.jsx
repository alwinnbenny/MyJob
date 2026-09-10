import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EmployeeSidebar } from "../components/EmployeeSidebar";
import { EmployeeNavbar } from "../components/EmployeeNavbar";
import { RichTextEditor } from "../components/RichTextEditor";
import { useParams } from "react-router-dom";
import { api } from "../config/axios";
import { Notification } from "../components/Notification";




export const PostJob = () => {
  const { id } = useParams();
 

  const navigate = useNavigate();

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };



 const [formData, setFormData] = useState({
  title: "",
  location: "",
  salary: "",
  employmentType: "",
  experience: "",
  category: "",
  openings: "",
  deadline: "",
  status: "Active",
  skills: "",
  description: "",
  
});

// const [formData, setFormData] = useState({
//   title: "Python Developer",
//   location: "Chennai, Tamil Nadu",
//   salary: "₹6 LPA - ₹9 LPA",
//   employmentType: "Full Time",
//   experience: "2+ Years",
//   category: "Software Development",
//   openings: 2,
//   deadline: "2026-12-01",
//   status: "Active",
//   skills: "Python, Django, Flask, REST API, PostgreSQL, Git",
//   description:
//     "We are looking for a Python Developer to develop reliable backend services and scalable web applications.",
// });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRichTextChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.title ||
    !formData.location ||
    !formData.salary ||
    !formData.employmentType ||
    !formData.experience ||
    !formData.category ||
    !formData.openings ||
    !formData.deadline ||
    !formData.description
  ) {
    showNotification("Please fill all required fields.", "error");
    return;
  }

  try {
    const response = await api.post(
      "/api/job-portal/employer/postjob",
      formData
    );

    console.log("Job created:", response.data);

    showNotification("Job Posted Successfully!");

    setTimeout(() => {
      navigate("/Dashboard");
    }, 1500);
  } catch (error) {
    console.log(
      "Post job error:",
      error.response?.data || error.message
    );

    showNotification(
      error.response?.data?.message ||
        "Something went wrong while posting the job.",
      "error"
    );
  }
};

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1">
        <EmployeeNavbar />

        <div className="flex-1">
          {/* Notification */}
          <Notification
            notification={notification}
            onClose={() => setNotification(null)}
          />

          <div className="p-8">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">Post New Job</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
                    Basic Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="e.g. Frontend Developer"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    {/* <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. Google"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div> */}

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        placeholder="e.g. kochi / Bangalore"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Salary *
                      </label>
                      <input
                        type="text"
                        name="salary"
                        placeholder="e.g. ₹8 LPA - ₹12 LPA"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
                    Job Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Employment Type
                      </label>
                      <select
                        name="employmentType"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      >
                        <option value="">Select type</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Internship</option>
                        <option>Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Experience Required
                      </label>
                      <input
                        type="text"
                        name="experience"
                        placeholder="e.g. 2+ years"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        placeholder="e.g. Engineering"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        No. of Openings
                      </label>
                      <input
                        type="number"
                        name="openings"
                        placeholder="e.g. 3"
                        value={formData.openings}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Application Deadline
                      </label>
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      >
                        <option value="Active">Active</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block text-sm text-gray-500 mb-1">
                      Required Skills
                    </label>
                    <input
                      type="text"
                      name="skills"
                      placeholder="e.g. React, Node.js, MongoDB"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
                    Job Description
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">
                        Description
                      </label>
                      <RichTextEditor
                        name="description"
                        placeholder="Describe the role..."
                        value={formData.description}
                        onChange={(val) => handleRichTextChange("description", val)}
                        className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    {/* <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Responsibilities
                    </label>
                    <RichTextEditor
                      name="responsibilities"
                      placeholder="List the key responsibilities..."
                      value={formData.responsibilities}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div> */}

                  {/* <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Requirements
                    </label>
                    <RichTextEditor
                      rows="4"
                      name="requirements"
                      placeholder="List the requirements..."
                      value={formData.requirements}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Benefits
                    </label>
                    <RichTextEditor
                      rows="4"
                      name="benefits"
                      placeholder="e.g. Health insurance, flexible hours..."
                      value={formData.benefits}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div> */}
                  </div>
                </div>

              
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate("/Dashboard")}
                    className="px-6 py-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5  bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                  >
                    Publish Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
