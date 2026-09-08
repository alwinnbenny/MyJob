import { NavLink } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Search, MapPin, Layers, ChevronDown } from "lucide-react";
import { FilterBar } from "../components/Filterbar";
import { Jobreuse } from "../components/Jobreuse";

export const Findjob = () => {
  return (
    <div>
      <Navbar />

      <section className="bg-muted-foreground py-4 w-full min-h-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-semibold">Find Job</h2>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <NavLink to="/" className="hover:text-blue-600">
                Home
              </NavLink>
              <span>/</span>
              <span className="text-black">Find Job</span>
            </div>
          </div>
          <br />

          {/* Search Box */}

          <div className="bg-white shadow-lg w-full max-w-7xl border-amber-50  p-3 py-4 flex items-center">
            {/* Job Title */}
            <div className="flex items-center flex-1 gap-3 px-4">
              <Search size={22} className="text-blue-600" />
              <input
                type="text"
                placeholder="Job title, Keyword..."
                className="w-full outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="h-10 border-l"></div>

            {/* Location */}
            <div className="flex items-center flex-1 gap-3 px-4">
              <MapPin size={22} className="text-blue-600" />
              <input
                type="text"
                placeholder="Your Location"
                className="w-full outline-none placeholder:text-gray-400"
              />
            </div>
            {/* Select Category */}

            <div className="relative flex items-center flex-1 gap-3 px-4">
              <Layers size={22} className="text-blue-600" />

              <select
                className="w-full appearance-none outline-none bg-transparent text-gray-400 cursor-pointer pr-8"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option>IT & Software</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Sales</option>
                <option>Human Resources</option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 text-gray-500 pointer-events-none"
              />
            </div>
            {/* Advanced Filter */}
            <div className="relative flex items-center flex-1 gap-3 px-4">
              {/* <Layers size={22} className="text-blue-600" /> */}

              <select
                className="w-full appearance-none outline-none bg-transparent text-gray-400 cursor-pointer pr-8"
                defaultValue=""
              >
                <option value="" disabled>
                  Advanced Filter
                </option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
                <option></option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-4 text-gray-500 pointer-events-none"
              />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-semibold transition whitespace-nowrap cursor-pointer">
              Find Job
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <FilterBar />
          <Jobreuse />
        </div>
      </section>
    </div>
  );
};
