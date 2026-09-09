import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeNavbar } from "../components/EmployeeNavbar";
import { EmployeeSidebar } from "../components/EmployeeSidebar";
import { api } from "../config/axios";
import { Notification } from "../components/Notification";

export const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    employmentType: "",
    experience: "",
    category: "",
    openings: "",
    deadline: "",
    status: "",
    skills: "",
    description: "",
    responsibilities: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/api/job-portal/employer/getsinglejob/${id}`,
        );

        console.log("Job to edit:", response.data);

        const job = response.data.job;

        setFormData({
          title: job.title || "",
          company: job.company || "",
          location: job.location || "",
          salary: job.salary || "",
          employmentType: job.employmentType || "",
          experience: job.experience || "",
          category: job.category || "",
          openings: job.openings || "",
          deadline: job.deadline
            ? job.deadline.split("T")[0]
            : "",
          status: job.status || "",
          skills: Array.isArray(job.skills)
            ? job.skills.join(", ")
            : job.skills || "",
          description: job.description || "",
          responsibilities: job.responsibilities || "",
        });
      } catch (error) {
        console.log(
          "Get job error:",
          error.response?.data || error.message,
        );

        setError(
          error.response?.data?.message ||
            "Unable to load job details",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError("");

      const updatedData = {
        ...formData,

        openings: Number(formData.openings),

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      };

      const response = await api.put(
        `/api/job-portal/employer/updatejob/${id}`,
        updatedData,
      );

      console.log("Update response:", response.data);

      showNotification("Job updated successfully!");

      setTimeout(() => navigate(`/my-job`), 1500);
    } catch (error) {
      console.log(
        "Update job error:",
        error.response?.data || error.message,
      );

      setError(
        error.response?.data?.message ||
          "Unable to update job",
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-gray-100 min-h-screen">
        <EmployeeSidebar />

        <div className="flex-1">
          <EmployeeNavbar />

          <div className="min-h-[80vh] flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              Loading job details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="flex bg-gray-100 min-h-screen">
        <EmployeeSidebar />

        <div className="flex-1">
          <EmployeeNavbar />

          <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
            <p className="text-red-500 text-lg font-medium">
              {error}
            </p>

            <button
              onClick={() => navigate("/my-job")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Back to My Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1">
        <EmployeeNavbar />

        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />

        <div className="bg-gray-100 min-h-screen py-8 px-6">
          <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
              <h1 className="text-3xl font-semibold text-gray-800">
                Edit Job
              </h1>

              <p className="text-gray-500 mt-2">
                Update the details of your job posting.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdate}>

              {/* Basic Information */}
              <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter job title"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter location"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                      required
                    />
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary
                    </label>

                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="Example: ₹6 LPA - ₹8 LPA"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Type
                    </label>

                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600 bg-white"
                      required
                    >
                      <option value="">
                        Select employment type
                      </option>
                      <option value="Full Time">
                        Full Time
                      </option>
                      <option value="Part Time">
                        Part Time
                      </option>
                      <option value="Internship">
                        Internship
                      </option>
                      <option value="Contract">
                        Contract
                      </option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience
                    </label>

                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Example: 2+ Years"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Example: Software Development"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Openings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Openings
                    </label>

                    <input
                      type="number"
                      name="openings"
                      value={formData.openings}
                      onChange={handleChange}
                      min="1"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Deadline
                    </label>

                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-white"
                    >
                      <option value="Active">
                        Active
                      </option>
                      <option value="Inactive">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Skills Required
                </h2>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Example: React, JavaScript, Node.js"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                />

                <p className="text-xs text-gray-400 mt-2">
                  Separate multiple skills using commas.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Job Description
                </h2>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="8"
                  placeholder="Enter job description"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600 resize-none"
                />
              </div>

             
              {/* <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Responsibilities
                </h2>

                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows="8"
                  placeholder="Enter job responsibilities"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:border-blue-600 resize-none"
                />
              </div> */}

              {/* Buttons */}
              <div className="flex justify-end gap-4 pb-8">

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-3 rounded-lg transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className={`px-6 py-3 rounded-lg text-white transition ${
                    updating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {updating ? "Updating..." : "Update Job"}
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};