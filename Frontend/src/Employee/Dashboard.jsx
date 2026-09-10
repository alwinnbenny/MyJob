import { EmployeeSidebar } from "../components/EmployeeSidebar";
import { EmployeeNavbar } from "../components/EmployeeNavbar";
import { DashboardCard } from "../components/DashboardCard";

import { api } from "../config/axios";

import {
  BriefcaseBusiness,
  BadgeCheck,
  BadgeX,
  Users,
  DollarSign,
  MapPin,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../Context/UserContext";
export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const Navigate = useNavigate();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    closedJobs: 0,
    applicants: 0,
  });
  const [jobs, setJobs] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get(
          "/api/job-portal/employer/employerstats",
        );

        console.log("Employer stats:", response.data);

        setStats(response.data.stats);
      } catch (error) {
        console.log("Stats error:", error.response?.data || error.message);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const response = await api.get("/api/job-portal/employer/getrecentjob");

        console.log(response.data);

        setJobs(response.data.jobs);
      } catch (error) {
        console.log("Stats error:", error.response?.data || error.message);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchRecentJobs();
  }, []);

  const statCards = [
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: BriefcaseBusiness,
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: BadgeCheck,
    },
    {
      title: "Closed Jobs",
      value: stats.closedJobs,
      icon: BadgeX,
    },
    {
      title: "Applicants",
      value: stats.applicants,
      icon: Users,
    },
  ];
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1">
        <EmployeeNavbar />
        <div>
          <p className="text-gray-500 text-xl mt-6 ml-6 ">
            Welcome,{" "}
            <span className="font-semibold text-blue-400">
              {user?.username}
            </span>
          </p>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {statCards.map((item) => (
              <DashboardCard
                key={item.title}
                title={item.title}
                value={item.value}
                icon={item.icon}
              />
            ))}
          </div>

          <div className="bg-white mt-10 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6">Recent Job Posts</h2>
            {jobs.length === 0 ? (
              <div className="h-72 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                <p className="text-gray-500">No jobs posted yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-[#18191C] hover:text-[#0A65CC] transition">
                            {job.title}
                          </h3>
                          <span className="bg-[#E7F0FA] text-[#0A65CC] text-sm px-3 py-1 rounded-full flex items-center gap-1">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-[#767F8C] text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-primary" />{" "}
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} className="text-primary" />{" "}
                            {job.salary}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status?.toLowerCase() === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      {/* <div>
                        <p className="text-sm text-gray-500">Applicants</p>
                        <p className="font-medium">{applicants.length}</p>
                      </div> */}

                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-medium">{job.experience}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                      <div
                        className="text-gray-600 text-sm line-clamp-2 prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => Navigate(`/my-job/${job._id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
