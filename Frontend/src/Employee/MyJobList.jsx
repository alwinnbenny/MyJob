import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmployeeSidebar } from "../components/EmployeeSidebar";
import { EmployeeNavbar } from "../components/EmployeeNavbar";
import { api } from "../config/axios";

import {
  BriefcaseBusiness,
  MapPin,
  DollarSign,
  PlusCircle,
  Pencil,
  Eye,
} from "lucide-react";

export const MyJobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await api.get("/api/job-portal/employer/getmyjob");

        console.log("My employer jobs:", response.data);

        setJobs(response.data.jobs);
      } catch (error) {
        console.log(
          "Get my jobs error:",
          error.response?.data || error.message,
        );
      }
    };

    fetchMyJobs();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1">
        <EmployeeNavbar />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Jobs</h1>

              <p className="text-gray-500 mt-1">Manage all your posted jobs</p>
            </div>

            <Link
              to="/post-job"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 font-medium transition-all duration-200 shadow-sm"
            >
              <PlusCircle size={18} />
              Post New Job
            </Link>
          </div>

          {/* No Jobs */}
          {jobs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-16 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-200">
              <BriefcaseBusiness size={48} className="text-gray-300" />

              <h2 className="text-xl font-semibold text-gray-500">
                No Jobs Posted Yet
              </h2>

              <p className="text-gray-400 text-sm">
                Start by posting your first job listing.
              </p>

              <Link
                to="/post-job"
                className="mt-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
              >
                <PlusCircle size={16} />
                Post a Job
              </Link>
            </div>
          ) : (
            /* Jobs */
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Title */}
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3
                          className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition cursor-pointer"
                          onClick={() => navigate(`/my-job/${job._id}`)}
                        >
                          {job.title}
                        </h3>

                        <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                          {job.employmentType}
                        </span>

                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            job.status?.toLowerCase() === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>

                      {/* Company */}
                      <p className="text-gray-500 text-sm mb-3">
                        {job.company}
                      </p>

                      {/* Job details */}
                      <div className="flex items-center gap-5 text-gray-500 text-sm flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-blue-500" />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <DollarSign size={14} className="text-blue-500" />
                          {job.salary}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <BriefcaseBusiness
                            size={14}
                            className="text-blue-500"
                          />
                          {job.experience}
                        </span>
                      </div>

                      {/* Description */}
                      {job.description && (
                        <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                          {job.description}
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => navigate(`/my-job/${job._id}`)}
                        className="flex items-center gap-2 border border-gray-200 hover:border-blue-400 hover:text-blue-600 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        <Eye size={15} />
                        View
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/employee/edit-job/${job._id}`)
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
