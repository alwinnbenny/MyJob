import {
  Palette,
  Code2,
  Megaphone,
  MonitorPlay,
  Music2,
  Landmark,
  BriefcaseMedical,
  Database,
  ArrowRight,
} from "lucide-react";

export const PopularCategory = () => {
  const categories = [
    { id: 1, title: "Graphics & Design", jobs: 357, icon: Palette },
    { id: 2, title: "Code & Programming", jobs: 312, icon: Code2 },
    { id: 3, title: "Digital Marketing", jobs: 297, icon: Megaphone },
    { id: 4, title: "Video & Animation", jobs: 247, icon: MonitorPlay },
    { id: 5, title: "Music & Audio", jobs: 204, icon: Music2 },
    { id: 6, title: "Account & Finance", jobs: 167, icon: Landmark },
    { id: 7, title: "Health & Care", jobs: 125, icon: BriefcaseMedical },
    { id: 8, title: "Data & Science", jobs: 57, icon: Database },
  ];

  return (
    <section className="bg-white py-16 w-full min-h-198.5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-5xl font-semibold">Popular category</h2>
          <button className="flex items-center gap-3 border px-6 py-3 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer">
            View All
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(({ id, title, jobs, icon: Icon }) => (
            <div
              key={id}
              className="flex items-center gap-5 rounded-xl p-6 transition-all duration-300 cursor-pointer hover:bg-white hover:shadow-lg"
            >
              {/* Icon */}
              <div className="group w-16 h-16 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 hover:bg-blue-600 transition-colors duration-300">
                <Icon
                  size={32}
                  className="text-blue-600 group-hover:text-white transition-colors duration-300"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-500 mt-2">{jobs} Open position</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
