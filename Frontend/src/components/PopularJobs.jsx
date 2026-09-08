const jobs = [
  {
    title: "Anesthesiologists",
    openings: "45,904 Open Positions",
  },
  {
    title: "Surgeons",
    openings: "50,364 Open Positions",
  },
  {
    title: "Obstetricians-Gynecologists",
    openings: "4,339 Open Positions",
  },
  {
    title: "Orthodontists",
    openings: "20,079 Open Positions",
  },
  {
    title: "Maxillofacial Surgeons",
    openings: "74,875 Open Positions",
  },
  {
    title: "Software Developer",
    openings: "43,359 Open Positions",
  },
  {
    title: "Psychiatrists",
    openings: "18,599 Open Positions",
  },
  {
    title: "Data Scientist",
    openings: "28,200 Open Positions",
    
  },
  {
    title: "Financial Manager",
    openings: "61,391 Open Positions",
  },
  {
    title: "Management Analysis",
    openings: "93,046 Open Positions",
  },
  {
    title: "IT Manager",
    openings: "50,963 Open Positions",
  },
  {
    title: "Operations Research Analysis",
    openings: "16,627 Open Positions",
  },
];

export const PopularJobs = () => {
  return (
    <section className="bg-white py-16 w-full min-h-198.5">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-semibold text-[#18191C] mb-16">
          Most Popular Vacancies
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-14">

          {jobs.map((job, index) => (
            <div
              key={index}
              className="cursor-pointer group"
            >
              <h2
                className={`text-[28px] font-medium transition text-[#18191C] group-hover:text-blue-600 
                  
                }`}
              >
                {job.title}
              </h2>

              <p className="mt-2 text-lg text-[#767F8C]">
                {job.openings}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};