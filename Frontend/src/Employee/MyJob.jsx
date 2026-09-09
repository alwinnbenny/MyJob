import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Briefcase,
  BriefcaseBusiness,
  DoorOpen,
  File,
  MapPin,
  Pencil,
  Timer,
  Wallet,
} from "lucide-react";

import { EmployeeSidebar } from "../components/EmployeeSidebar";
import { EmployeeNavbar } from "../components/EmployeeNavbar";
import { api } from "../config/axios";
import { Notification } from "../components/Notification";

export const MyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
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

        console.log("Job response:", response.data);

        setJob(response.data.job);
      } catch (error) {
        console.log("Get job error:", error.response?.data || error.message);

        setError(error.response?.data?.message || "Unable to load job");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading job...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>

        <button
          onClick={() => navigate("/my-job")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Back to My Jobs
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Job Not Found</h1>

        <button
          onClick={() => navigate("/my-jobs")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Back to My Jobs
        </button>
      </div>
    );
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(
        `/api/job-portal/employer/deletejob/${id}`,
      );

      console.log("Delete response:", response.data);

      showNotification("Job deleted successfully");

      setTimeout(() => navigate("/my-job"), 1500);
    } catch (error) {
      console.log("Delete job error:", error.response?.data || error.message);

      showNotification(
        error.response?.data?.message ||
          "Something went wrong while deleting the job",
        "error"
      );
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1">
        <EmployeeNavbar />

        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />

        <div className="bg-white w-full py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{job.title}</h1>

                  <p className="text-gray-500 mt-2">{job.company}</p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    job.status?.toLowerCase() === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            </div>

            <div className="flex gap-6 mt-8 items-start">
              <div className="flex-1 flex flex-col gap-6">
                <div className="bg-white p-8 rounded-2xl shadow">
                  <h2 className="text-xl font-semibold mb-3">
                    Job Description
                  </h2>

                  <p className="text-gray-600 whitespace-pre-line">
                    {job.description || "No description provided."}
                  </p>
                </div>

                {job.responsibilities && (
                  <div className="bg-white p-8 rounded-2xl shadow">
                    <h2 className="text-2xl font-semibold mb-3">
                      Responsibilities
                    </h2>

                    <p className="text-gray-600 whitespace-pre-line">
                      {job.responsibilities}
                    </p>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow p-8">
                  <h2 className="text-2xl font-semibold mb-4">
                    Skills Required
                  </h2>

                  <p className="text-gray-600">
                    {Array.isArray(job.skills)
                      ? job.skills.join(", ")
                      : job.skills || "No skills specified."}
                  </p>
                </div>
              </div>

              <div className="w-96 shrink-0 bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-semibold mb-6">Job Overview</h2>

                <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                  <div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                      <Wallet size={20} className="text-primary" />
                    </div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                      Salary
                    </p>

                    <p className="font-semibold text-sm">{job.salary || "—"}</p>
                  </div>

                  <div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                      <MapPin size={20} className="text-primary" />
                    </div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                      Location
                    </p>

                    <p className="font-semibold text-sm">
                      {job.location || "—"}
                    </p>
                  </div>

                  <div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                      <BriefcaseBusiness size={20} className="text-primary" />
                    </div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                      Job Type
                    </p>

                    <p className="font-semibold text-sm">
                      {job.employmentType || "—"}
                    </p>
                  </div>

                  <div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                      <Briefcase size={20} className="text-primary" />
                    </div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                      Experience
                    </p>

                    <p className="font-semibold text-sm">
                      {job.experience || "—"}
                    </p>
                  </div>

                  <div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                      <File size={20} className="text-primary" />
                    </div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                      Category
                    </p>

                    <p className="font-semibold text-sm">
                      {job.category || "—"}
                    </p>
                  </div>

                  <div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                      <DoorOpen size={20} className="text-primary" />
                    </div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                      Openings
                    </p>

                    <p className="font-semibold text-sm">
                      {job.openings || "—"}
                    </p>
                  </div>

                  <div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2">
                      <Timer size={20} className="text-primary" />
                    </div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
                      Deadline
                    </p>

                    <p className="font-semibold text-sm">
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => navigate("/my-job")}
                className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-5 py-2 rounded-lg transition"
              >
                Back
              </button>

              <button
                onClick={() => navigate(`/employee/edit-job/${job._id}`)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                <Pencil size={16} />
                Edit Job
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
