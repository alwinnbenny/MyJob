
import { useEffect, useState } from "react";
import { EmployeeNavbar } from "../components/EmployeeNavbar"
import { EmployeeSidebar } from "../components/EmployeeSidebar"
import { api } from "../config/axios";


export const Applicants = ()=>{

const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
      const fetchApplicantDetails = async () => {
        try {
          setLoading(true);
          setError("");
  
          const response = await api.get(
            "/api/job-portal/employer/applicantlist"
          );
  
          console.log("Applicant details:", response.data);
  
          setApplicants(response.data);
        } catch (error) {
          console.log(
            "applicant details error:",
            error.response?.data || error.message
          );
  
          setError(
            error.response?.data?.message || "Unable to load applicant details"
          );
        } finally {
          setLoading(false);
        }
      };
  
    
        fetchApplicantDetails();
      
    }, []);
  
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading job details...</p>
        </div>
      );
    }
  
    return (
    <div className="flex bg-gray-100 min-h-screen">
      <EmployeeSidebar />

      <div className="flex-1">
        <EmployeeNavbar />

        <div className="bg-gray-100 flex-1 rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-semibold mb-6">
            Recent Applicants
          </h2>

          {error ? (
            <div className="h-72 border-2 border-dashed border-red-300 rounded-xl flex items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : applicants.length === 0 ? (
            <div className="h-72 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">
                No applications yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {applicants.map((applicant) => (
                <div
                  key={applicant._id}
                  className="border border-gray-200 bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          applicant.candidate?.profileImage ||
                          "/default-profile.png"
                        }
                        alt={
                          applicant.candidate?.username ||
                          "Applicant"
                        }
                        className="w-14 h-14 rounded-lg object-cover"
                      />

                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-[#18191C]">
                            {applicant.candidate?.username ||
                              "Unknown Applicant"}
                          </h3>

                          <span className="bg-[#E7F0FA] text-[#0A65CC] text-sm px-3 py-1 rounded-full">
                            {applicant.status || "Applied"}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-[#767F8C] text-sm">
                          <span>
                            {applicant.candidate?.email ||
                              " email not provided"}
                          </span>

                          <span>
                            {applicant.candidate?.phone ||
                              "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {applicant.status || "Applied"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Job Applied
                      </p>

                      <p className="font-medium">
                        {applicant.job?.title ||
                          "Unknown Job"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Company
                      </p>

                      <p className="font-medium">
                        {applicant.job?.company ||
                          "Unknown Company"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Applied On
                      </p>

                      <p className="font-medium">
                        {applicant.createdAt
                          ? new Date(
                              applicant.createdAt
                            ).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400 mb-1">
                        Application ID
                      </p>

                      <p className="font-medium truncate">
                        {applicant._id}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                      View Application
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};