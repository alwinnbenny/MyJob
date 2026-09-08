import { BadgeCheck, CloudUpload, Search, User} from "lucide-react";

export const JobpilotWorking = () => {
  return (
    <section className="bg-muted-foreground py-16 w-full min-h-130.5">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="flex justify-center text-center text-5xl">
          How jobpilot work
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {/* Card 1 */}
          <div className="bg-muted-foreground rounded-xl p-6 flex flex-col gap-6 shadow-sm group cursor-pointer transition-shadow hover:shadow-md w-full h-56 opacity-100 rotate-0">
            <div className="bg-white group-hover:bg-blue-600 p-4 w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 mx-auto">
              <User
                className="text-blue-600  group-hover:text-white transition-colors duration-300"
                size={24}
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Create account</h2>
              <p className="text-gray-500 mt-1 text-sm leading-relaxed">
                Aliquam facilisis egestas sapien, nec tempor leo trisique at.
              </p>
            </div>
          </div>

          {/* card - 2 */}
          <div className="bg-white rounded-xl p-6 flex flex-col gap-6 shadow-sm group cursor-pointer transition-shadow hover:shadow-md w-full h-56 opacity-100 rotate-0">
            <div className="bg-white group-hover:bg-blue-600 p-4 w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 mx-auto">
              <CloudUpload
                className="text-blue-600  group-hover:text-white transition-colors duration-300"
                size={24}
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Upload CV/Resume</h2>
              <p className="text-gray-500 mt-1 text-sm leading-relaxed">
                Curabitur sit amet maximus ligula. Nam a nulla ante. Nam
                sodales.
              </p>
            </div>
          </div>

          {/* card - 3 */}
          <div className="bg-muted-foreground rounded-xl p-6 flex flex-col gap-6 shadow-sm group cursor-pointer transition-shadow hover:shadow-md w-full h-56 opacity-100 rotate-0">
            <div className="bg-white group-hover:bg-blue-600 p-4 w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 mx-auto">
              <Search
                className="text-blue-600  group-hover:text-white transition-colors duration-300"
                size={24}
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Find sutable job</h2>
              <p className="text-gray-500 mt-1 text-sm leading-relaxed">
                Phasellus quis eleifend ex. Morbi nec fringilla nibh.
              </p>
            </div>
          </div>

          {/* card - 4 */}
          <div className="bg-muted-foreground rounded-xl p-6 flex flex-col gap-6 shadow-sm group cursor-pointer transition-shadow hover:shadow-md w-full h-56 opacity-100 rotate-0">
            <div className="bg-white group-hover:bg-blue-600 p-4 w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 mx-auto">
              <BadgeCheck
                className="text-blue-600  group-hover:text-white transition-colors duration-300"
                size={24}
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">Apply job</h2>
              <p className="text-gray-500 mt-1 text-sm leading-relaxed">
                Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales
                purus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
