import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

export const Topcompanies = () => {
  const companies = [
    {
      id: 1,
      logo: "/logos/dribbble.png",
      name: "Dribbble",
      location: "United States",
      tag: "Featured",
    },
    {
      id: 2,
      logo: "/logos/upwork.png",
      name: "Upwork",
      location: "United States",
    },
    {
      id: 3,
      logo: "/logos/slack.png",
      name: "Slack",
      location: "China",
    },
    {
      id: 4,
      logo: "/logos/freepik.png",
      name: "Freepik",
      location: "United States",
    },
  ];
  return (
    <section className="bg-white py-16 w-full min-h-198.5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="flex justify-between items-center mb-12">
          <h2 className="text-5xl font-semibold text-[#18191C]">
            Top companies
          </h2>

          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-lg bg-[#E7F0FA] flex items-center justify-center hover:bg-[#0A65CC] hover:text-white transition cursor-pointer">
              <ArrowLeft size={20} />
            </button>

            <button className="w-12 h-12 rounded-lg bg-[#E7F0FA] flex items-center justify-center hover:bg-[#0A65CC] hover:text-white transition cursor-pointer">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Cards 1st Row*/}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="border border-secondary rounded-xl p-8 hover:border-[#0A65CC] hover:shadow-xl transition-all duration-300"
            >
              {/* Company */}

              <div className="flex items-center justify-start gap-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-14 h-14 rounded-lg"
                />

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-[#18191C]">
                      {company.name}
                    </h3>

                    {company.tag && (
                      <span className="bg-[#FFF1F0] text-[#FF6A6A] text-sm px-3 py-1 rounded-full">
                        {company.tag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-[#767F8C]">
                    <MapPin size={16} />

                    <span>{company.location}</span>
                  </div>
                </div>
              </div>

              {/* Button */}

              <button className="w-full mt-8 py-4  bg-[#E7F0FA] text-[#0A65CC] font-medium hover:bg-[#0A65CC] hover:text-white transition cursor-pointer">
                Open Position
              </button>
            </div>
          ))}
        </div>

        {/* Card-2nd row */}
        <div className="my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {companies.map((company) => (
              <div
                key={company.id}
                className=" border border-secondary rounded-xl p-8 hover:border-[#0A65CC] hover:shadow-xl transition-all duration-300"
              >
                {/* Company */}

                <div className="flex items-center gap-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-14 h-14 rounded-md"
                  />

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-[#18191C]">
                        {company.name}
                      </h3>

                      {company.tag && (
                        <span className="bg-[#FFF1F0] text-[#FF6A6A] text-sm px-3 py-1 rounded-full">
                          {company.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-[#767F8C]">
                      <MapPin size={16} />

                      <span>{company.location}</span>
                    </div>
                  </div>
                </div>

                {/* Button */}

                <button className="w-full mt-8 py-4 bg-[#E7F0FA] text-[#0A65CC] font-medium hover:bg-[#0A65CC] hover:text-white transition cursor-pointer">
                  Open Position
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
