import { BriefcaseBusiness } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-black py-16 w-full min-h-122.5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-5 gap-12">
          {/* Logo */}

          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" />
            </div>

            <p className="text-[#767F8C] text-xl mb-5">
              Call now:
              <span className="text-white ml-2">(319) 555-0115</span>
            </p>

            <p className="text-[#767F8C] leading-8">
              6391 Elgin St. Celina, Delaware 10299, New York, United States of
              America
            </p>
          </div>

          {/* First column */}

          <div>
            <h3 className="text-white text-2xl font-medium mb-8">Quick Link</h3>

            <ul className="space-y-5 text-[#767F8C]">
              <li className="hover:text-white cursor-pointer">About</li>

              <li className="hover:text-white flex items-center gap-2 cursor-pointer">
                Contact
              </li>

              <li className="hover:text-white cursor-pointer">Pricing</li>

              <li className="hover:text-white cursor-pointer">Blog</li>
            </ul>
          </div>

          {/* 2nd column*/}

          <div>
            <h3 className="text-white text-2xl font-medium mb-8">Candidate</h3>

            <ul className="space-y-5 text-[#767F8C]">
              <li className="hover:text-white cursor-pointer transition">
                Browse Jobs
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Browse Employers
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Candidate Dashboard
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Saved Jobs
              </li>
            </ul>
          </div>

          {/* Employers */}

          <div>
            <h3 className="text-white text-2xl font-medium mb-8">Employers</h3>

            <ul className="space-y-5 text-[#767F8C]">
              <li className="hover:text-white cursor-pointer transition">
                Post a Job
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Browse Candidates
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Employers Dashboard
              </li>

              <li className="hover:text-white cursor-pointer transition">
                {" "}
                Applications
              </li>
            </ul>
          </div>

         

          <div>
            <h3 className="text-white text-2xl font-medium mb-8">Support</h3>

            <ul className=" space-y-5 text-[#767F8C]">
              <li className="hover:text-white cursor-pointer transition">
                Faqs
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Privacy Policy
              </li>

              <li className="hover:text-white cursor-pointer transition">
                Terms & Conditions
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}

      <div className="border-t border-[#2F3338]">
        <div className="max-w-7xl h-17 mx-auto px-6 py-6 flex justify-between items-center">
          <p className="text-[#767F8C]">
            © 2024 MyJob - Job Portal. All rights reserved
          </p>

          <div className="flex items-center gap-5 text-[#767F8C]">
            <FaFacebook
              size={22}
              className="hover:text-white cursor-pointer transition"
            />

            <FaYoutube
              size={22}
              className="hover:text-white cursor-pointer transition"
            />

            <FaInstagram
              size={22}
              className="hover:text-white cursor-pointer transition"
            />

            <FaTwitter
              size={22}
              className="hover:text-white cursor-pointer transition"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
