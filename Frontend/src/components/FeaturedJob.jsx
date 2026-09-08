import {
  ArrowRight,
  Bookmark,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config/axios";

export const FeaturedJob = () => {
  const navigate = useNavigate();
  // const jobLists = [
  //   {
  //     id: 1,
  //     logo: "/logos/upwork.png",
  //     title: "Senior UX Designer",
  //     type: "Remote",
  //     location: "Australia",
  //     salary: "$30K-$35K",
  //     days: "4 Days Remaining",
  //     isSaved: false,
  //   },
  //   {
  //     id: 2,
  //     logo: "/logos/apple.png",
  //     title: "Software Engineer",
  //     type: "Full Time",
  //     location: "China",
  //     salary: "$50K-$60K",
  //     days: "4 Days Remaining",
  //     isSaved: false,
  //   },
  //   {
  //     id: 3,
  //     logo: "/logos/figma.png",
  //     title: "Junior Graphic Designer",
  //     type: "Full Time",
  //     location: "Canada",
  //     salary: "$50K-$70K",
  //     days: "4 Days Remaining",
  //     isSaved: false,
  //   },
  //   {
  //     id: 4,
  //     logo: "/logos/udemy.png",
  //     title: "Product Designer",
  //     type: "Full Time",
  //     location: "United States",
  //     salary: "$35K-$40K",
  //     days: "4 Days Remaining",
  //     isSaved: false,
  //   },
  //   {
  //     id: 5,
  //     logo: "/logos/facebook.png",
  //     title: "Marketing Officer",
  //     type: "Internship",
  //     location: "Germany",
  //     salary: "$50K-$90K",
  //     days: "4 Days Remaining",
  //     isSaved: false,
  //   },
  //   {
  //     id: 6,
  //     logo: "/logos/google.png",
  //     title: "Interaction Designer",
  //     type: "Full Time",
  //     location: "France",
  //     salary: "$5K-$10K",
  //     days: "4 Days Remaining",
  //     isSaved: false,
  //   },;
  // ];

  const [jobLists, setJobLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobLists = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/api/job-portal/candidate/joblist");

        console.log("joblistings:", response.data);

        setJobLists(Array.isArray(response.data) ? response.data : response.data.jobLists || []);
      } catch (error) {
        console.log(
          "Get my jobs error:",
          error.response?.data || error.message,
        );
        setError(error.response?.data?.message || "unable to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobLists();
  }, []);

  //get remaining days

  const getRemainingDays = (deadline) => {
    if (!deadline) {
      return "No deadline ";
    }

    const today = new Date();
    const deadlineDate = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const difference = deadlineDate.getTime() - today.getTime();

    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (days < 0) return "Expired";

    if (days === 0) return "Today";

    if (days === 1) {
      return "1 Day remaining";
    }

    return `${days} Days Remaining`;
  };

  const handleSaved = (id) => {
    setJobLists((prevJobs) =>
      prevJobs.map((job) =>
        job._id === id
          ? {
              ...job,
              isSaved: !job.isSaved,
            }
          : job,
      ),
    );
  };

  if (loading) {
    return (
      <section className="bg-white w-full min-h-198.5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-center text-gray-500">Loading jobs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white w-full min-h-198.5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-center text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white w-full min-h-198.5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="flex justify-between items-center mb-16">
          <h2 className="text-5xl font-semibold">Featured Job</h2>

          <button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-3 border px-6 py-3 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            View All
            <ArrowRight size={20} />
          </button>
        </div>

        {/* No jobs */}

        {jobLists.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No jobs available.</p>
          </div>
        ) : (
          /* Job Cards */

          <div className="space-y-6">
            {jobLists.map((job) => {
              const {
                _id,
                title,
                company,
                employmentType,
                location,
                salary,
                deadline,
                isSaved,
              } = job;

              return (
                <div
                  key={_id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-secondary rounded-xl px-7 py-6 hover:border-[#0A65CC] hover:shadow-lg transition-all duration-300 gap-4"
                >
                  

                  <div className="flex items-center gap-5">
                    

                    <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-[#E7F0FA]">
                      
                      <span className="text-2xl font-bold text-blue-600">
                        {company?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>


                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className="text-xl font-semibold text-[#18191C] hover:text-[#0A65CC] transition cursor-pointer"
                          onClick={() => navigate(`/job/${_id}`)}
                        >
                          {title}
                        </h3>

                        <span className="bg-[#E7F0FA] text-[#0A65CC] text-sm px-3 py-1 rounded-full">
                          {employmentType}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-[#767F8C] text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {location}
                        </span>

                        <span className="flex items-center gap-1">
                          <DollarSign size={14} />
                          {salary}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock size={14} />

                          {getRemainingDays(deadline)}
                        </span>
                      </div>
                    </div>
                  </div>

                 

                  <div className="flex items-center gap-3 self-start sm:self-center">
                  

                    <button
                      className="p-2 border border-gray-200 rounded-md bg-[#E7F0FA] hover:text-[#0A65CC] transition-all cursor-pointer"
                      onClick={() => handleSaved(_id)}
                    >
                      {isSaved ? (
                        <Bookmark className="fill-black" size={20} />
                      ) : (
                        <Bookmark className="text-badge-foreground" size={20} />
                      )}
                    </button>

                  

                    <button
                      className="flex items-center gap-2 bg-[#E7F0FA] text-[#0A65CC] px-6 py-3 hover:bg-[#0A65CC] hover:text-white transition-all cursor-pointer"
                      onClick={() => navigate(`/job/${_id}`)}
                    >
                      Apply Now
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
