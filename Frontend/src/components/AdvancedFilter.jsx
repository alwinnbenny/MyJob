import { useState } from "react";

export const AdvancedFilter = ({ onClose }) => {
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [jobTypes, setJobTypes] = useState([]);
  const [education, setEducation] = useState([]);
  const [jobLevel, setJobLevel] = useState("");

  const handleJobType = (type) => {
    setJobTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type],
    );
  };

  const handleEducation = (value) => {
    setEducation((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const resetFilters = () => {
    setExperience("");
    setSalary("");
    setJobTypes([]);
    setEducation([]);
    setJobLevel("");
  };

  const applyFilters = () => {
    const filters = {
      experience,
      salary,
      jobTypes,
      education,
      jobLevel,
    };

    console.log(filters);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl">
     
        <div className="flex items-center justify-between px-6 py-4 ">
          <h2 className="text-xl font-semibold text-gray-800">
            Advanced Search
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        
        <div className="grid grid-cols-5">
         
          <div className="p-6 ">
            <h3 className="font-semibold  text-gray-800 mb-5">Experience</h3>

            {[
              "Freshers",
              "1 - 2 Years",
              "2 - 4 Years",
              "4 - 6 Years",
              "6 - 8 Years",
              "8 - 10 Years",
              "10 - 15 Years",
              "15+ Years",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 mb-4 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <input
                  type="radio"
                  name="experience"
                  value={item}
                  checked={experience === item}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-4 h-4 accent-blue-600"
                />

                {item}
              </label>
            ))}
          </div>

          
          <div className="p-6 ">
            <h3 className="font-semibold text-gray-800 mb-5">Salary</h3>

            {[
              "$50 - $1000",
              "$1000 - $2000",
              "$2000 - $3000",
              "$3000 - $4000",
              "$4000 - $6000",
              "$6000 - $8000",
              "$8000 - $10000",
              "$10000 - $15000",
              "$15000+",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 mb-4 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <input
                  type="radio"
                  name="salary"
                  value={item}
                  checked={salary === item}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-4 h-4 accent-blue-600"
                />

                {item}
              </label>
            ))}
          </div>

          
          <div className="p-6 ">
            <h3 className="font-semibold text-gray-800 mb-5">Job Type</h3>

            {[
              "All",
              "Full Time",
              "Part Time",
              "Internship",
              "Remote",
              "Temporary",
              "Contract Base",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 mb-4 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={jobTypes.includes(item)}
                  onChange={() => handleJobType(item)}
                  className="w-4 h-4 accent-blue-600"
                />

                {item}
              </label>
            ))}
          </div>

          
          <div className="p-6 ">
            <h3 className="font-semibold text-gray-800 mb-5">Education</h3>

            {[
              "All",
              "High School",
              "Intermediate",
              "Graduation",
              "Master Degree",
              "Bachelor Degree",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 mb-4 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={education.includes(item)}
                  onChange={() => handleEducation(item)}
                  className="w-4 h-4 accent-blue-600"
                />

                {item}
              </label>
            ))}
          </div>

          
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-5">Job Level</h3>

            {["Entry Level", "Mid Level", "Expert Level"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 mb-4 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
q                 >
                <input
                  type="radio"
                  name="jobLevel"
                  value={item}
                  checked={jobLevel === item}
                  onChange={(e) => setJobLevel(e.target.value)}
                  className="w-4 h-4 accent-blue-600"
                />

                {item}
              </label>
            ))}
          </div>
        </div>

       
        <div className="flex justify-end gap-3 px-6 py-4 ">
          <button
            onClick={resetFilters}
            className="px-6 py-3  border-gray-300 rounded-md
                       text-gray-600 hover:bg-gray-100 transition"
          >
            Reset
          </button>

          <button
            onClick={applyFilters}
            className="px-6 py-3 bg-blue-600 text-white rounded-md
                       hover:bg-blue-700 transition"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};
