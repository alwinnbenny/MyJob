import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { MapPin, ArrowRight, Briefcase, Users, Search, Layers, ChevronDown } from "lucide-react";
import axios from "axios";

export const Employers = ()=>{

  const [employers, setEmployers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getEmployers();
  }, []);

  const getEmployers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/job-portal/employer/companylist"
      );
      setEmployers(response.data.employers);
    } catch (error) {
      setError(error.message);
    }
  };
    return(
        <>
        <div>
             <Navbar/>
      {/* Header Section */}
      <section className="bg-muted-foreground py-4 w-full min-h-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-semibold">Employers</h2>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
              <span>/</span>
              <span className="text-black">Employers</span>
            </div>
          </div>
          <br />

          {/* Search Bar — design only */}
          <div className="bg-white shadow-lg w-full max-w-7xl p-3 py-4 flex items-center">
            {/* Company / Keyword */}
            <div className="flex items-center flex-1 gap-3 px-4">
              <Search size={22} className="text-blue-600" />
              <input
                type="text"
                placeholder="Company name, keyword..."
                className="w-full outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="h-10 border-l" />

            {/* Location */}
            <div className="flex items-center flex-1 gap-3 px-4">
              <MapPin size={22} className="text-blue-600" />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Industry */}
            <div className="relative flex items-center flex-1 gap-3 px-4">
              <Layers size={22} className="text-blue-600" />
              <select
                className="w-full appearance-none outline-none bg-transparent text-gray-400 cursor-pointer pr-8"
                defaultValue=""
              >
                <option value="" disabled>Select Industry</option>
                <option>IT & Software</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Sales</option>
                <option>Human Resources</option>
              </select>
              <ChevronDown size={18} className="absolute right-4 text-gray-500 pointer-events-none" />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-semibold transition whitespace-nowrap cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* Result count */}
          {employers.length > 0 && (
            <p className="text-sm text-gray-500 mb-6">
              Showing <span className="font-semibold text-gray-800">{employers.length}</span> employer{employers.length !== 1 ? "s" : ""}
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-red-500 py-10">{error}</p>
          )}

          {/* No results */}
          {!error && employers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No employers found.</p>
            </div>
          )}

          <div className="space-y-6">
            {employers.map((employer) => (
              <div
                key={employer._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-secondary rounded-xl px-7 py-6 hover:border-[#0A65CC] hover:shadow-lg transition-all duration-300 gap-4"
              >
                {/* Left Side */}
                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-[#E7F0FA]">
                    <span className="text-2xl font-bold text-blue-600">
                      {employer.company?.charAt(0)?.toUpperCase() || "?"}
                    </span>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-[#18191C] hover:text-[#0A65CC] transition cursor-pointer">
                        {employer.company || "Unnamed Company"}
                      </h3>
                      {employer.industry && (
                        <span className="bg-[#E7F0FA] text-[#0A65CC] text-sm px-3 py-1 rounded-full flex items-center gap-1">
                          <Briefcase size={12} />
                          {employer.industry}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-[#767F8C] text-sm">
                      {employer.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {employer.location}
                        </span>
                      )}
                      {employer.teamSize && (
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {employer.teamSize}
                        </span>
                      )}
                      {employer.user?.fullname && (
                        <span className="text-gray-400">{employer.user.fullname}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3 self-start sm:self-center">
                  <button className="flex items-center gap-2 bg-[#E7F0FA] text-[#0A65CC] px-6 py-3 hover:bg-[#0A65CC] hover:text-white transition-all cursor-pointer">
                    View Jobs
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
        </div>
        </>
    )
}