import {
  ArrowRight,
  Bookmark,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Jobreuse = () => {
  const navigate = useNavigate();
  const jobLists = [
    {
      id: 1,
      logo: "/logos/upwork.png",
      title: "Senior UX Designer",
      type: "Remote",
      location: "Australia",
      salary: "$30K-$35K",
      days: "4 Days Remaining",
      isSaved: false,
    },
    {
      id: 2,
      logo: "/logos/apple.png",
      title: "Software Engineer",
      type: "Full Time",
      location: "China",
      salary: "$50K-$60K",
      days: "4 Days Remaining",
      isSaved: false,
    },
    {
      id: 3,
      logo: "/logos/figma.png",
      title: "Junior Graphic Designer",
      type: "Full Time",
      location: "Canada",
      salary: "$50K-$70K",
      days: "4 Days Remaining",
      isSaved: false,
    },
    {
      id: 4,
      logo: "/logos/udemy.png",
      title: "Product Designer",
      type: "Full Time",
      location: "United States",
      salary: "$35K-$40K",
      days: "4 Days Remaining",
      isSaved: false,
    },
    {
      id: 5,
      logo: "/logos/facebook.png",
      title: "Marketing Officer",
      type: "Internship",
      location: "Germany",
      salary: "$50K-$90K",
      days: "4 Days Remaining",
      isSaved: false,
    },
    {
      id: 6,
      logo: "/logos/google.png",
      title: "Interaction Designer",
      type: "Full Time",
      location: "France",
      salary: "$5K-$10K",
      days: "4 Days Remaining",
      isSaved: false,
    },
  ];

  const [Saved, setIsSaved] = useState(jobLists);
  // Bookmark
  const handleSaved = (id) => {
    setIsSaved((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, isSaved: !job.isSaved } : job,
      ),
    );
  };

  return (
    <section className="bg-white py-16 w-full min-h-198.5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-5xl font-semibold">Featured Job</h2>
          <button className="flex items-center gap-3 border px-6 py-3 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition">
            View All
            <ArrowRight size={20} />
          </button>
        </div> */}

        {/* Job Cards */}

        <div className="space-y-6">
          {Saved.map(
            ({ id, logo, title, type, location, salary, days, isSaved }) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-secondary rounded-xl px-7 py-6 hover:border-[#0A65CC] hover:shadow-lg transition-all duration-300 gap-4"
              >
                {/* Left Side */}

                <div className="flex items-center gap-5">
                  {/* Logo */}

                  <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                    <img
                      src={logo}
                      alt="No image"
                      className="w-12 h-12 object-contain"
                    />
                  </div>

                  {/* Job Details */}

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-[#18191C] hover:text-[#0A65CC] transition">
                        {title}
                      </h3>

                      <span className="bg-[#E7F0FA] text-[#0A65CC] text-sm px-3 py-1 rounded-full flex items-center gap-1">
                        {type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[#767F8C] text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} /> {salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {days}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3 self-start sm:self-center">
                  <button
                    className="p-2  border border-gray-200 rounded-md bg-[#E7F0FA] hover:text-[#0A65CC] transition-all cursor-pointer"
                    onClick={() => handleSaved(id)}
                  >
                    {isSaved ? (
                      <Bookmark className="fill-black" size={20} />
                    ) : (
                      <Bookmark className="text-badge-foreground" size={20} />
                    )}
                  </button>
                  <button className="flex items-center gap-2 bg-[#E7F0FA] text-[#0A65CC] px-6 py-3  hover:bg-[#0A65CC] hover:text-white transition-all cursor-pointer"
                  onClick={()=>navigate("/jobdetailed")}>
                    Apply Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
