import { Search, MapPin, Briefcase, Building2, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="bg-muted-foreground py-16 w-full min-h-198.5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Left Side */}
          <div className="w-full flex flex-col gap-8">
            <h1 className="text-[48px] md:text-[64px] leading-tight font-semibold text-[#18191C]">
              Find a job that suits
              <br />
              your interest &
              <br />
              skills.
            </h1>

            <p className="text-[#5E6670] text-lg leading-8 max-w-xl">
              Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
              in scelerisque leo, eget sollicitudin velit vestibulum.
            </p>

            {/* Search Box */}

            <div className="bg-white shadow-lg w-full max-w-2xl border-amber-50 rounded-lg p-3 flex items-center">
              {/* Job */}

              <div className="flex items-center flex-1 gap-3 px-4">
                <Search size={22} className="text-blue-600" />

                <input
                  type="text"
                  placeholder="Job title, Keyword..."
                  className="w-full outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <div className="h-10 border-l"></div>

              {/* Location */}

              <div className="flex items-center flex-1 gap-3 px-4">
                <MapPin size={22} className="text-blue-600" />

                <input
                  type="text"
                  placeholder="Your Location"
                  className="w-full outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-semibold transition whitespace-nowrap cursor-pointer">
                Find Job
              </button>
            </div>

            {/* Suggestions */}

            <p className="text-gray-500">
              Suggestion:
              <span className="ml-2 text-gray-700">Designer,</span>
              <span className="ml-2 text-gray-700">Programing,</span>
              <span className="ml-2 text-blue-600 font-medium">
                Digital Marketing,
              </span>
              <span className="ml-2 text-gray-700">Video,</span>
              <span className="ml-2 text-gray-700">Animation.</span>
            </p>
          </div>

          {/* Right Side Image */}

          <div className="flex justify-center items-start mt-25">
            <img
              src="/Illustration.png"
              alt="hero-image"
              className="w-full max-w-lg h-auto max-h-95.5 object-contain opacity-100 rotate-0"
            />
          </div>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {/* Card 1 */}
          <div className="bg-white rounded-md p-5 flex items-center gap-5 shadow-sm group cursor-pointer transition-shadow hover:shadow-md">
            <div className="bg-blue-50 group-hover:bg-blue-600 p-4 w-18 h-18 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300">
              <Briefcase
                className="text-blue-600 group-hover:text-white transition-colors duration-300"
                size={34}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">1,75,324</h2>
              <p className="text-gray-500 mt-1">Live Job</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-md p-5 flex items-center gap-5 shadow-sm group cursor-pointer transition-shadow hover:shadow-md">
            <div className="bg-blue-50 group-hover:bg-blue-600 p-4 w-18 h-18 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300">
              <Building2
                className="text-blue-600 group-hover:text-white transition-colors duration-300"
                size={34}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">97,354</h2>
              <p className="text-gray-500 mt-1">Companies</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-md p-5 flex items-center gap-5 shadow-sm group cursor-pointer transition-shadow hover:shadow-md">
            <div className="bg-blue-50 group-hover:bg-blue-600 p-4 w-18 h-18 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300">
              <Users
                className="text-blue-600 group-hover:text-white transition-colors duration-300"
                size={34}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">38,47,154</h2>
              <p className="text-gray-500 mt-1">Candidates</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-md p-5 flex items-center gap-5 shadow-sm group cursor-pointer transition-shadow hover:shadow-md">
            <div className="bg-blue-50 group-hover:bg-blue-600 p-4 w-18 h-18 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300">
              <Briefcase
                className="text-blue-600 group-hover:text-white transition-colors duration-300"
                size={34}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">7,532</h2>
              <p className="text-gray-500 mt-1">New Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
