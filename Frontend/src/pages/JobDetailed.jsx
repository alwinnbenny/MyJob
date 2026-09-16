import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import {
  Bookmark,
  ArrowRight,
  PhoneCall,
  Mail,
  CalendarDays,
  Timer,
  GraduationCap,
  Wallet,
  MapPin,
  BriefcaseBusiness,
  Briefcase,
  Link2,
  ArrowLeft,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

import { Navbar } from "../components/Navbar";
import { api } from "../config/axios";
import { Notification } from "../components/Notification";

export const JobDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/api/job-portal/candidate/getsinglejob/${id}`
        );

        console.log("Job details:", response.data);

        setJob(response.data.job);
      } catch (error) {
        console.log(
          "Get job details error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message || "Unable to load job details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Job Not Found</h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const calculateDaysRemaining = () => {
    if (!job.deadline) return "";

    const today = new Date();
    const deadline = new Date(job.deadline);

    const difference = deadline - today;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return "Expired";
    }

    if (days === 0) {
      return "Expires today";
    }

    return `${days} Days Remaining`;
  };

const handleApplyJob = async () => {
  try {
    const response = await api.post(
      `/api/job-portal/candidate/applications/applyjob/${job._id}`
    );

    console.log("Application response:", response.data);

    showNotification("Application submitted successfully!");
  } catch (error) {
    console.log(
      "Apply job error:",
      error.response?.data || error.message
    );

    showNotification(
      error.response?.data?.message ||
        "Something went wrong while applying for this job",
      "error"
    );
  }
};




  return (
    <div>
      <Navbar />

      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      
      <section className="bg-muted-foreground py-4 w-full min-h-18">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-semibold">Find Job</h2>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <NavLink to="/" className="hover:text-blue-600">
                Home
              </NavLink>

              <span>/</span>

              <NavLink to="/find-job" className="hover:text-blue-600">
                Find Job
              </NavLink>

              <span>/</span>

              <span>{job.category || "Job"}</span>

              <span>/</span>

              <span className="text-black">Job Details</span>
            </div>
          </div>
        </div>
      </section>

   
      <div className="bg-white w-full py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-7 py-6 gap-4">

            <div className="flex items-center gap-5">

             
              <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={job.company || "Company"}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-600">
                    {job.company?.charAt(0).toUpperCase() || "C"}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-xl font-semibold text-[#18191C]">
                    {job.title}
                  </h3>

                  {job.status === "Active" && (
                    <span className="bg-[#FFF1F0] text-[#FF6A6A] text-sm px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}

                  <span className="bg-[#E7F0FA] text-[#0A65CC] text-sm px-3 py-1 rounded-full">
                    {job.employmentType || "Full Time"}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[#767F8C] text-sm flex-wrap">

                  {job.website && (
                    <span className="flex items-center gap-1">
                      <Link2
                        className="text-[#0A65CC]"
                        size={14}
                      />
                      {job.website}
                    </span>
                  )}

                  {job.phone && (
                    <span className="flex items-center gap-1">
                      <PhoneCall
                        className="text-[#0A65CC]"
                        size={14}
                      />
                      {job.phone}
                    </span>
                  )}

                  {job.email && (
                    <span className="flex items-center gap-1">
                      <Mail
                        className="text-[#0A65CC]"
                        size={14}
                      />
                      {job.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            
            <div className="flex flex-col items-start sm:items-end gap-2">

              <div className="flex items-center gap-3">

                <button
                  className="p-2 border border-gray-200 bg-[#E7F0FA] hover:text-[#0A65CC] transition-all cursor-pointer"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark
                    className={
                      isSaved
                        ? "fill-black"
                        : "text-badge-foreground"
                    }
                    size={20}
                  />
                </button>

                <button
                  onClick={handleApplyJob}
                  className="flex items-center gap-2 bg-[#E7F0FA] text-[#0A65CC] px-6 py-3 hover:bg-[#0A65CC] hover:text-white transition-all cursor-pointer"
                >
                  Apply Now
                  <ArrowRight size={18} />
                </button>
              </div>

              <p className="text-[#767F8C] text-xs">
                Job expires in:{" "}
                <span className="text-[#E05151] font-medium">
                  {calculateDaysRemaining()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white w-full py-10">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex gap-8 flex-col lg:flex-row">

            {/* Left Side */}
            <div className="flex flex-col gap-8 flex-1">

              {/* Job Description */}
              <div>
                <h2 className="text-[#18191C] text-xl font-bold mb-4">
                  Job Description
                </h2>

                <div
                  className="text-[#5E6670] text-sm leading-relaxed prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: job.description || "<p>No job description provided.</p>" }}
                />
              </div>

              {/* Responsibilities */}
              {job.responsibilities && (
                <div>
                  <h2 className="text-[#18191C] text-xl font-bold mb-4">
                    Responsibilities
                  </h2>

                  <p className="text-[#5E6670] text-sm leading-relaxed whitespace-pre-line">
                    {job.responsibilities}
                  </p>
                </div>
              )}

              {/* Skills */}
              <div>
                <h2 className="text-[#18191C] text-xl font-bold mb-4">
                  Skills Required
                </h2>

                <p className="text-[#5E6670] text-sm leading-relaxed">
                  {Array.isArray(job.skills)
                    ? job.skills.join(", ")
                    : job.skills || "No skills specified."}
                </p>
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <span className="text-[#18191C] text-sm font-semibold whitespace-nowrap">
                  Share this job:
                </span>

                <div className="flex gap-3">

                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-[#0A65CC] text-sm font-medium hover:bg-[#0A65CC] hover:text-white transition-all"
                  >
                    <FaFacebookF size={14} />
                    Facebook
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-[#1DA1F2] text-sm font-medium hover:bg-[#1DA1F2] hover:text-white transition-all"
                  >
                    <FaTwitter size={14} />
                    Twitter
                  </a>

                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-[#E60023] text-sm font-medium hover:bg-[#E60023] hover:text-white transition-all"
                  >
                    <FaPinterestP size={14} />
                    Pinterest
                  </a>

                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-125">

              {/* Job Overview */}
              <div className="border-2 border-gray-200 rounded-sm p-8">

                <h2 className="text-[24px] font-semibold text-black mb-8">
                  Job Overview
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-9 gap-x-8">

                  {/* Posted */}
                  <div>
                    <CalendarDays
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      JOB POSTED
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>

                  {/* Deadline */}
                  <div>
                    <Timer
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      JOB EXPIRE IN
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <GraduationCap
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      EDUCATION
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.education || "—"}
                    </p>
                  </div>

                  {/* Salary */}
                  <div>
                    <Wallet
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      SALARY
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.salary || "—"}
                    </p>
                  </div>

                  {/* Location */}
                  <div>
                    <MapPin
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      LOCATION
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.location || "—"}
                    </p>
                  </div>

                  {/* Job Type */}
                  <div>
                    <BriefcaseBusiness
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      JOB TYPE
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.employmentType || "—"}
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <Briefcase
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      EXPERIENCE
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.experience || "—"}
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <BriefcaseBusiness
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      CATEGORY
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.category || "—"}
                    </p>
                  </div>

                </div>
              </div>

              {/* Company Card */}
              <div className="border-2 border-gray-200 rounded-sm p-8 mt-6">

                <div className="flex gap-4 pb-6 border-b border-gray-200">

                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded">
                    {job.logo ? (
                      <img
                        src={job.logo}
                        className="w-14 h-14 object-contain"
                        alt={job.company}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-blue-600">
                        {job.company?.charAt(0).toUpperCase() || "C"}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-[20px] font-semibold text-black">
                      {job.company || "Company"}
                    </h2>

                    <p className="text-[#5E6670] text-[16px] leading-5">
                      {job.category || "Company"}
                    </p>
                  </div>

                </div>

                <div className="space-y-5 mt-6">

                  {job.phone && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#767F8C]">
                        Phone:
                      </span>

                      <span className="font-medium text-[#18191C]">
                        {job.phone}
                      </span>
                    </div>
                  )}

                  {job.email && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#767F8C]">
                        Email:
                      </span>

                      <span className="font-medium text-[#18191C]">
                        {job.email}
                      </span>
                    </div>
                  )}

                  {job.website && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#767F8C]">
                        Website:
                      </span>

                      <span className="font-medium text-[#18191C]">
                        {job.website}
                      </span>
                    </div>
                  )}

                </div>

                <div className="flex gap-3 mt-10">

                  <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition">
                    <FaFacebookF className="text-[#0A65CC] group-hover:text-white transition" />
                  </button>

                  <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition">
                    <FaTwitter className="text-[#0A65CC] group-hover:text-white transition" />
                  </button>

                  <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition">
                    <FaInstagram className="text-[#0A65CC] group-hover:text-white transition" />
                  </button>

                  <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition">
                    <FaYoutube className="text-[#0A65CC] group-hover:text-white transition" />
                  </button>

                </div>
              </div>
            </div>
          </div>

          
          <div className="mt-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              <ArrowLeft size={18} />
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};