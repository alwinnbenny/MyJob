import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

 

export const Register = () => {

 const navigate = useNavigate();


  return (
    <section className="bg-white py-16 w-full min-h-122.5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Candidate Card */}

          <div className="bg-muted-foreground rounded-xl p-12 w-full h-auto">
            <h2 className="text-[32px] font-semibold text-[#18191C] mb-6">
              Become a Candidate
            </h2>

            <p className="text-[#767F8C] text-md leading-8 max-w-md mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              cursus a dolor convallis efficitur.
            </p>

            <button className="flex items-center gap-3 bg-white text-[#0A65CC] font-medium px-6 py-3 rounded-lg hover:bg-[#0A65CC] hover:text-white transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/create-account")}>
              Register Now
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Employer Card */}

          <div className="bg-[#0A65CC] rounded-xl p-12 w-full h-auto">
            <h2 className="text-[32px] font-semibold text-white mb-6">
              Become a Employers
            </h2>

            <p className="text-[#D5E7FA] text-md leading-8 max-w-md mb-10">
              Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi
              sed efficitur dolor. Pelque augue risus.
            </p>

            <button className="flex items-center gap-3 bg-white font-medium px-6 py-3 rounded-lg text-blue-600 hover:bg-blue-200 transition-colors duration-300 cursor-pointer"
            onClick={() => navigate("/create-account")}>
              Register Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
