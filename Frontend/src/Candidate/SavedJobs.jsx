import { useEffect, useState } from "react";
import { api } from "../config/axios";
import { ArrowRight, Bookmark, MapPin, Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const SavedJobs = () => {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/job-portal/candidate/getsavedjobs");

        setSavedJobs(response.data.jobs || []);
      } catch (error) {
        console.log(
          "Get saved jobs error:",
          error.response?.data || error.message,
        );

        setError(error.response?.data?.message || "Unable to load saved jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemoveSaved = async (jobId) => {
    try {
      await api.post(`/api/job-portal/candidate/savejob/${jobId}`);

      setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.log(
        "Remove saved job error:",
        error.response?.data || error.message,
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p>Loading saved jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
<div>

    <Navbar/>
    
<section className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold mb-8">Saved Jobs</h1>

        {savedJobs.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark size={50} className="mx-auto text-gray-300 mb-4" />

            <p className="text-gray-500">You haven't saved any jobs yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {savedJobs.map((job) => (
              <div
                key={job._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                           border border-gray-200 rounded-xl px-7 py-6
                           hover:border-[#0A65CC] hover:shadow-lg
                           transition-all duration-300 gap-4"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-[#E7F0FA]">
                    <span className="text-2xl font-bold text-blue-600">
                      {job.company?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        onClick={() => navigate(`/job/${job._id}`)}
                        className="text-xl font-semibold cursor-pointer
                                   hover:text-[#0A65CC]"
                      >
                        {job.title}
                      </h3>

                      <span className="bg-[#E7F0FA] text-[#0A65CC] text-sm px-3 py-1 rounded-full">
                        {job.employmentType}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[#767F8C] text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <DollarSign size={14} />
                        {job.salary}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRemoveSaved(job._id)}
                    className="p-2 border border-gray-200 rounded-md
                               bg-[#E7F0FA] hover:text-red-500"
                  >
                    <Bookmark size={20} className="fill-black" />
                  </button>

                  <button
                    onClick={() => navigate(`/job/${job._id}`)}
                    className="flex items-center gap-2
                               bg-[#E7F0FA] text-[#0A65CC]
                               px-6 py-3
                               hover:bg-[#0A65CC] hover:text-white"
                  >
                    View Job
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>

</div>


    
  );
};
