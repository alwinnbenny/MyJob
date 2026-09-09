// import { useState } from "react";
// import { Navbar } from "../components/Navbar";
// import {  NavLink } from "react-router-dom";
// import {
//   Bookmark,
//   ArrowRight,
//   PhoneCall,
//   Mail,
//   CalendarDays,
//   Timer,
//   GraduationCap,
//   Wallet,
//   MapPin,
//   BriefcaseBusiness,
//   Briefcase,
//   Link2,
//   ArrowLeft,
// } from "lucide-react";
// import {
//   FaInstagram,
//   FaFacebookF,
//   FaTwitter,
//   FaPinterestP,
//   FaYoutube,
// } from "react-icons/fa";

// export const JobDetailed = () => {
//   const details = [
//     {
//       id: 1,
//       logo: "/insta-logo.png",
//       title: "Senior UX Designer",
//       type: "Full Time",
//       tag: "Featured",
//       insta: "https://instagram.com",
//       phone: "(406) 555-0120",
//       mail: "career@instagram.com",
//       isSaved: true,
//     },
//   ];

//   const Overview = [
//     {
//       icon: <CalendarDays />,
//       label: "JOB POSTED",
//       desc: "14 June,2021",
//     },
//     {
//       icon: <Timer />,
//       label: "JOB EXPIRE IN:",
//       desc: "14 July, 2021",
//     },
//     {
//       icon: <GraduationCap />,
//       label: "EDUCATION",
//       desc: "Graduation",
//     },
//     {
//       icon: <Wallet />,
//       label: "SALARY:",
//       desc: "$50k-80k/month",
//     },
//     {
//       icon: <MapPin />,
//       label: "LOCATION:",
//       desc: "New York, USA",
//     },
//     {
//       icon: <BriefcaseBusiness />,
//       label: "JOB TYPE:",
//       desc: "Full Time",
//     },
//     {
//       icon: <Briefcase />,
//       label: "EXPERIENCE",
//       desc: "10-15 Years",
//     },
//   ];

//   const companies = [
//     {
//       id: 1,
//       logo: "/Freepik.png",
//       name: "Freepik",
//       location: "China",
//       position: "Visual Designer",
//       tag: "Featured",
//       type: "Full Time",
//       salary: "$10K-$15K",
//     },
//     {
//       id: 2,
//       logo: "/instagram.png",
//       name: "Instagram",
//       location: "Australia",
//       position: "Front End Designer",
//       type: "Contract Base",
//       salary: "$50K-80K",
//     },
//     {
//       id: 3,
//       logo: "/Upwork.png",
//       name: "Upwork",
//       location: "France",
//       position: "Technical Support Speciality",
//       type: "Full Time",
//       salary: "$35K-$40K",
//     },
//     {
//       id: 4,
//       logo: "/Facebook.png",
//       name: "Facebook",
//       location: "United Kingdom",
//       position: "Software Engineer",
//       type: "Part time",
//       salary: "$15K-$20K",
//     },
//     {
//       id: 5,
//       logo: "/Microsoft.png",
//       name: "Microsoft",
//       location: "Australia",
//       position: "Product Designer",
//       type: "Part time",
//       salary: "$40K-$50K",
//     },
//     {
//       id: 6,
//       logo: "/Youtube.png",
//       name: "Youtube",
//       location: "Germany",
//       position: "Interaction Designer ",
//       type: "Full time",
//       salary: "$20K-$25K",
//     },
//   ];

//   const [isSaved, setIsSaved] = useState(false);

//   return (
//     <div>
//       <Navbar />
//       <section className="bg-muted-foreground py-4 w-full min-h-18">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-black text-lg font-semibold">Find Job</h2>

//             <div className="flex items-center gap-1 text-sm text-gray-500">
//               <NavLink to="/" className="hover:text-blue-600">
//                 Home
//               </NavLink>
//               <span>/</span>
//               <NavLink to="Findjob">Find Job</NavLink>
//               <span>/</span>
//               <span>Graphics & Design</span>
//               <span>/</span>
//               <span className="text-black">Job Details</span>
//             </div>
//           </div>
//           <br />
//         </div>
//       </section>

//       <div className="bg-white w-full py-6">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="space-y-6">
//             {details.map(
//               ({ id, logo, title, type, tag, insta, phone, mail }) => (
//                 <div
//                   key={id}
//                   className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-7 py-6 transition-all duration-300 gap-4"
//                 >
//                   {/* Left Side */}

//                   <div className="flex items-center gap-5">
//                     {/* Logo */}

//                     <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-white">
//                       <img
//                         src={logo}
//                         alt="No image"
//                         className="w-12 h-12 object-contain"
//                       />
//                     </div>

//                     {/* Job Details */}

//                     <div>
//                       <div className="flex items-center gap-3 mb-2">
//                         <h3 className="text-xl font-semibold text-[#18191C] hover:text-[#0A65CC] transition">
//                           {title}
//                         </h3>

//                         {tag && (
//                           <span className="bg-[#FFF1F0] text-[#FF6A6A] text-sm px-3 py-1 rounded-full">
//                             {tag}
//                           </span>
//                         )}

//                         <span className="bg-[#E7F0FA] text-[#0A65CC] text-sm px-3 py-1 rounded-full flex items-center gap-1">
//                           {type}
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-4 text-[#767F8C] text-sm">
//                         <span className="flex items-center gap-1">
//                           <Link2 className="text-[#0A65CC]" size={14} /> {insta}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <PhoneCall className="text-[#0A65CC]" size={14} />{" "}
//                           {phone}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Mail className="text-[#0A65CC]" size={14} /> {mail}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Side */}
//                   <div className="flex flex-col items-start sm:items-end gap-2 self-start sm:self-center">
//                     <div className="flex items-center gap-3">
//                       <button
//                         className="p-2 border border-gray-200  bg-[#E7F0FA] hover:text-[#0A65CC] transition-all cursor-pointer"
//                         onClick={() => setIsSaved(!isSaved)}
//                       >
//                         <Bookmark
//                           className={
//                             isSaved ? "fill-black" : "text-badge-foreground"
//                           }
//                           size={20}
//                         />
//                       </button>
//                       <button className="flex items-center gap-2 bg-[#E7F0FA] text-[#0A65CC] px-6 py-3 hover:bg-[#0A65CC] hover:text-white transition-all cursor-pointer">
//                         Apply Now
//                         <ArrowRight size={18} />
//                       </button>
//                     </div>
//                     <p className="text-[#767F8C] text-xs flex items-center gap-1">
                   
//                       Job expires in: <span className="text-[#E05151] font-medium">June 30, 2021</span>
//                     </p>
//                   </div>
                  
//                 </div>
//               ),
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white w-full py-10">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex gap-8">
//             {/* Left side Description*/}
//             <div className="flex flex-col gap-8 w-183.5 min-h-197">
//               {/* Job Description */}
//               <div>
//                 <h2 className="text-[#18191C] text-xl font-bold mb-4">
//                   Job Description
//                 </h2>
//                 <p className="text-[#5E6670] text-sm leading-relaxed mb-4">
//                   Integer aliquet pretium consequat. Donec et sapien id leo
//                   accumsan pellentesque eget maximus tellus. Duis et est ac leo
//                   rhoncus tincidunt vitae vehicula augue. Donec in suscipit
//                   diam. Pellentesque quis justo sit amet arcu commodo
//                   sollicitudin. Integer finibus blandit condimentum. Vivamus sit
//                   amet ligula ullamcorper, pulvinar ante id, tristique erat.
//                   Quisque sit amet aliquam urna. Maecenas blandit felis id massa
//                   sodales finibus. Integer bibendum eu nulla eu sollicitudin.
//                   Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit
//                   augue quis turpis auctor, dapibus euismod ante ultricies. Ut
//                   non felis lacinia turpis feugiat euismod at id magna. Sed ut
//                   orci arcu. Suspendisse sollicitudin faucibus aliquet.
//                 </p>
//                 <p className="text-[#5E6670] text-sm leading-relaxed">
//                   Nam dapibus consectetur erat in euismod. Cras urna augue,
//                   mollis venenatis augue sed, porttitor aliquet nibh. Sed
//                   tristique dictum elementum. Nulla imperdiet sit amet quam eget
//                   lobortis. Etiam in neque sit amet orci interdum tincidunt.
//                 </p>
//               </div>

//               {/* Responsibilities */}
//               <div>
//                 <h2 className="text-[#18191C] text-xl font-bold mb-4">
//                   Responsibilities
//                 </h2>
//                 <ul className="flex flex-col gap-3">
//                   {[
//                     "Quisque semper gravida est et consectetur.",
//                     "Curabitur blandit lorem velit, vitae pretium leo placerat eget.",
//                     "Morbi mattis in ipsum ac tempus.",
//                     "Curabitur eu vehicula libero. Vestibulum sed purus ullamcorper, lobortis lectus nec.",
//                     "vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.",
//                     "lobortis vel lectus. Nulla at risus ut diam.",
//                     "commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.",
//                     "odio metus posuere lorem, id condimentum erat velit nec neque.",
//                     "dui sodales ut. Curabitur tempus augue.",
//                   ].map((item, i) => (
//                     <li
//                       key={i}
//                       className="flex items-start gap-3 text-[#5E6670] text-sm"
//                     >
//                       <span className="mt-1.5 w-2 h-2 rounded-full bg-[#5E6670] shrink-0"></span>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
//                 <span className="text-[#18191C] text-sm font-semibold whitespace-nowrap">
//                   Share this job:
//                 </span>
//                 <div className="flex gap-3">
//                   <a
//                     href="https://www.facebook.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-[#0A65CC] text-sm font-medium hover:bg-[#0A65CC] hover:text-white hover:border-[#0A65CC] transition-all"
//                   >
//                     <FaFacebookF size={14} />
//                     Facebook
//                   </a>
//                   <a
//                     href="https://twitter.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-[#1DA1F2] text-sm font-medium hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
//                   >
//                     <FaTwitter size={14} />
//                     Twitter
//                   </a>
//                   <a
//                     href="https://pinterest.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-[#E60023] text-sm font-medium hover:bg-[#E60023] hover:text-white hover:border-[#E60023] transition-all"
//                   >
//                     <FaPinterestP size={14} />
//                     Pinterest
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* right side card */}
//             <div className="flex-1 ">
//               {/* job Overview card */}

//               <div className="border-2 border-gray-200 rounded-sm p-8 w-134 h-109">
//                 <h2 className="text-[24px] font-semibold text-black mb-8">
//                   Job Overview
//                 </h2>

//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-9 gap-x-8">
//                   {Overview.map((item, i) => (
//                     <div key={i}>
//                       <div size={20} className="text-[#0A65CC] mb-4">
//                         {item.icon}
//                       </div>
//                       <p className="text-[#5E6670] text-xs">{item.label}</p>
//                       <p className="text-black text-md font-semibold">{item.desc}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <br />
//               {/* company Card */}
//               <div className="border-2 border-gray-200 rounded-sm p-8 w-134 flex flex-col gap-6">
//                 <div className="flex gap-4 pb-6 border-b border-gray-200">
//                   <img
//                     src="/insta-logo.png"
//                     className="w-16 h-16"
//                     alt="instagram"
//                   />
//                   <div>
//                     <h2 className="text-[20px] font-semibold text-black">
//                       Instagram
//                     </h2>
//                     <p className="text-[#5E6670] text-[16px] leading-5">
//                       Social networking service
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-5">
//                   {[
//                     ["Founded in:", "March 21, 2006"],
//                     ["Organization type:", "Private Company"],
//                     ["Company size:", "120-300 Employers"],
//                     ["Phone:", "(406) 555-0120"],
//                     ["Email:", "twitter@gmail.com"],
//                     ["Website:", "https://twitter.com"],
//                   ].map(([label, value]) => (
//                     <div
//                       key={label}
//                       className="flex justify-between items-center"
//                     >
//                       <span className="text-[#767F8C]">{label}</span>
//                       <span className="font-medium text-[#18191C]">
//                         {value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex gap-3  mt-10">
//                   <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition cursor-pointer">
//                     <FaFacebookF className="text-[#0A65CC] group-hover:text-white transition" />
//                   </button>

//                   <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition cursor-pointer">
//                     <FaTwitter className="text-[#0A65CC] group-hover:text-white transition" />
//                   </button>

//                   <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition cursor-pointer">
//                     <FaInstagram className="text-[#0A65CC] group-hover:text-white transition" />
//                   </button>

//                   <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition cursor-pointer">
//                     <FaYoutube className="text-[#0A65CC] group-hover:text-white transition" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Related Jobs */}
//           <section className="space-y-8 mt-16">
//             <div className="flex justify-between items-center mb-12">
//               <h2 className="text-5xl font-semibold text-[#18191C]">
//                 Related Jobs
//               </h2>

//               <div className="flex gap-3">
//                 <button className="w-12 h-12 rounded-lg bg-[#E7F0FA] flex items-center justify-center hover:bg-[#0A65CC] hover:text-white transition cursor-pointer">
//                   <ArrowLeft size={20} />
//                 </button>

//                 <button className="w-12 h-12 rounded-lg bg-[#E7F0FA] flex items-center justify-center hover:bg-[#0A65CC] hover:text-white transition cursor-pointer">
//                   <ArrowRight size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Cards */}

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {companies.map((company) => (
//                 <div
//                   key={company.id}
//                   className="border border-secondary rounded-sm p-8"
//                 >
//                   {/* Company */}
//                   <div className="flex items-center justify-start gap-4 mb-4">
//                     <img
//                       src={company.logo}
//                       alt={company.name}
//                       className="w-14 h-14 rounded-sm"
//                     />

//                     <div>
//                       <div className="flex items-center gap-3">
//                         <h3 className="text-medium font-medium text-[#18191C]">
//                           {company.name}
//                         </h3>

//                         {company.tag && (
//                           <span className="bg-[#FFF1F0] text-[#FF6A6A] text-sm px-3 py-1 rounded-full">
//                             {company.tag}
//                           </span>
//                         )}
//                       </div>

//                       <div className="flex items-center gap-2 mt-2 text-[#767F8C]">
//                         <MapPin size={16} />
//                         <span className="">{company.location}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <h4 className="text-[#18191C] font-semibold mb-2">
//                     {company.position}
//                   </h4>

//                   <div className="flex items-center justify-between mt-3">
//                     <span className=" text-[#767F8C] text-xs px-3 py-1 ">
//                       {company.type}{"        "}
//                       {"●"}{"       "}
//                       {company.salary}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };



import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import {
  Bookmark,
  ArrowRight,
  PhoneCall,
  Mail,
  CalendarDays,
  Timer,
  GraduationCap,
  Wallet,
  MapPin,
  BriefcaseBusiness,
  Briefcase,
  Link2,
  ArrowLeft,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

import { Navbar } from "../components/Navbar";
import { api } from "../config/axios";
import { Notification } from "../components/Notification";

export const JobDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/api/job-portal/candidate/getsinglejob/${id}`
        );

        console.log("Job details:", response.data);

        setJob(response.data.job);
      } catch (error) {
        console.log(
          "Get job details error:",
          error.response?.data || error.message
        );

        setError(
          error.response?.data?.message || "Unable to load job details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Job Not Found</h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const calculateDaysRemaining = () => {
    if (!job.deadline) return "";

    const today = new Date();
    const deadline = new Date(job.deadline);

    const difference = deadline - today;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return "Expired";
    }

    if (days === 0) {
      return "Expires today";
    }

    return `${days} Days Remaining`;
  };

const handleApplyJob = async () => {
  try {
    const response = await api.post(
      `/api/job-portal/candidate/applications/applyjob/${job._id}`
    );

    console.log("Application response:", response.data);

    showNotification("Application submitted successfully!");
  } catch (error) {
    console.log(
      "Apply job error:",
      error.response?.data || error.message
    );

    showNotification(
      error.response?.data?.message ||
        "Something went wrong while applying for this job",
      "error"
    );
  }
};




  return (
    <div>
      <Navbar />

      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      
      <section className="bg-muted-foreground py-4 w-full min-h-18">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-semibold">Find Job</h2>

            <div className="flex items-center gap-1 text-sm text-gray-500">
              <NavLink to="/" className="hover:text-blue-600">
                Home
              </NavLink>

              <span>/</span>

              <NavLink to="/find-job" className="hover:text-blue-600">
                Find Job
              </NavLink>

              <span>/</span>

              <span>{job.category || "Job"}</span>

              <span>/</span>

              <span className="text-black">Job Details</span>
            </div>
          </div>
        </div>
      </section>

   
      <div className="bg-white w-full py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-7 py-6 gap-4">

            <div className="flex items-center gap-5">

             
              <div className="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={job.company || "Company"}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-600">
                    {job.company?.charAt(0).toUpperCase() || "C"}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-xl font-semibold text-[#18191C]">
                    {job.title}
                  </h3>

                  {job.status === "Active" && (
                    <span className="bg-[#FFF1F0] text-[#FF6A6A] text-sm px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}

                  <span className="bg-[#E7F0FA] text-[#0A65CC] text-sm px-3 py-1 rounded-full">
                    {job.employmentType || "Full Time"}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[#767F8C] text-sm flex-wrap">

                  {job.website && (
                    <span className="flex items-center gap-1">
                      <Link2
                        className="text-[#0A65CC]"
                        size={14}
                      />
                      {job.website}
                    </span>
                  )}

                  {job.phone && (
                    <span className="flex items-center gap-1">
                      <PhoneCall
                        className="text-[#0A65CC]"
                        size={14}
                      />
                      {job.phone}
                    </span>
                  )}

                  {job.email && (
                    <span className="flex items-center gap-1">
                      <Mail
                        className="text-[#0A65CC]"
                        size={14}
                      />
                      {job.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            
            <div className="flex flex-col items-start sm:items-end gap-2">

              <div className="flex items-center gap-3">

                <button
                  className="p-2 border border-gray-200 bg-[#E7F0FA] hover:text-[#0A65CC] transition-all cursor-pointer"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark
                    className={
                      isSaved
                        ? "fill-black"
                        : "text-badge-foreground"
                    }
                    size={20}
                  />
                </button>

                <button
                  onClick={handleApplyJob}
                  className="flex items-center gap-2 bg-[#E7F0FA] text-[#0A65CC] px-6 py-3 hover:bg-[#0A65CC] hover:text-white transition-all cursor-pointer"
                >
                  Apply Now
                  <ArrowRight size={18} />
                </button>
              </div>

              <p className="text-[#767F8C] text-xs">
                Job expires in:{" "}
                <span className="text-[#E05151] font-medium">
                  {calculateDaysRemaining()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white w-full py-10">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex gap-8 flex-col lg:flex-row">

            {/* Left Side */}
            <div className="flex flex-col gap-8 flex-1">

              {/* Job Description */}
              <div>
                <h2 className="text-[#18191C] text-xl font-bold mb-4">
                  Job Description
                </h2>

                <p className="text-[#5E6670] text-sm leading-relaxed whitespace-pre-line">
                  {job.description || "No job description provided."}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && (
                <div>
                  <h2 className="text-[#18191C] text-xl font-bold mb-4">
                    Responsibilities
                  </h2>

                  <p className="text-[#5E6670] text-sm leading-relaxed whitespace-pre-line">
                    {job.responsibilities}
                  </p>
                </div>
              )}

              {/* Skills */}
              <div>
                <h2 className="text-[#18191C] text-xl font-bold mb-4">
                  Skills Required
                </h2>

                <p className="text-[#5E6670] text-sm leading-relaxed">
                  {Array.isArray(job.skills)
                    ? job.skills.join(", ")
                    : job.skills || "No skills specified."}
                </p>
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <span className="text-[#18191C] text-sm font-semibold whitespace-nowrap">
                  Share this job:
                </span>

                <div className="flex gap-3">

                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-[#0A65CC] text-sm font-medium hover:bg-[#0A65CC] hover:text-white transition-all"
                  >
                    <FaFacebookF size={14} />
                    Facebook
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-[#1DA1F2] text-sm font-medium hover:bg-[#1DA1F2] hover:text-white transition-all"
                  >
                    <FaTwitter size={14} />
                    Twitter
                  </a>

                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-[#E60023] text-sm font-medium hover:bg-[#E60023] hover:text-white transition-all"
                  >
                    <FaPinterestP size={14} />
                    Pinterest
                  </a>

                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-125">

              {/* Job Overview */}
              <div className="border-2 border-gray-200 rounded-sm p-8">

                <h2 className="text-[24px] font-semibold text-black mb-8">
                  Job Overview
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-9 gap-x-8">

                  {/* Posted */}
                  <div>
                    <CalendarDays
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      JOB POSTED
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>

                  {/* Deadline */}
                  <div>
                    <Timer
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      JOB EXPIRE IN
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <GraduationCap
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      EDUCATION
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.education || "—"}
                    </p>
                  </div>

                  {/* Salary */}
                  <div>
                    <Wallet
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      SALARY
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.salary || "—"}
                    </p>
                  </div>

                  {/* Location */}
                  <div>
                    <MapPin
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      LOCATION
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.location || "—"}
                    </p>
                  </div>

                  {/* Job Type */}
                  <div>
                    <BriefcaseBusiness
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      JOB TYPE
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.employmentType || "—"}
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <Briefcase
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      EXPERIENCE
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.experience || "—"}
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <BriefcaseBusiness
                      size={20}
                      className="text-[#0A65CC] mb-4"
                    />

                    <p className="text-[#5E6670] text-xs">
                      CATEGORY
                    </p>

                    <p className="text-black text-md font-semibold">
                      {job.category || "—"}
                    </p>
                  </div>

                </div>
              </div>

              {/* Company Card */}
              <div className="border-2 border-gray-200 rounded-sm p-8 mt-6">

                <div className="flex gap-4 pb-6 border-b border-gray-200">

                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded">
                    {job.logo ? (
                      <img
                        src={job.logo}
                        className="w-14 h-14 object-contain"
                        alt={job.company}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-blue-600">
                        {job.company?.charAt(0).toUpperCase() || "C"}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-[20px] font-semibold text-black">
                      {job.company || "Company"}
                    </h2>

                    <p className="text-[#5E6670] text-[16px] leading-5">
                      {job.category || "Company"}
                    </p>
                  </div>

                </div>

                <div className="space-y-5 mt-6">

                  {job.phone && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#767F8C]">
                        Phone:
                      </span>

                      <span className="font-medium text-[#18191C]">
                        {job.phone}
                      </span>
                    </div>
                  )}

                  {job.email && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#767F8C]">
                        Email:
                      </span>

                      <span className="font-medium text-[#18191C]">
                        {job.email}
                      </span>
                    </div>
                  )}

                  {job.website && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#767F8C]">
                        Website:
                      </span>

                      <span className="font-medium text-[#18191C]">
                        {job.website}
                      </span>
                    </div>
                  )}

                </div>

                <div className="flex gap-3 mt-10">

                  <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition">
                    <FaFacebookF className="text-[#0A65CC] group-hover:text-white transition" />
                  </button>

                  <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition">
                    <FaTwitter className="text-[#0A65CC] group-hover:text-white transition" />
                  </button>

                  <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition">
                    <FaInstagram className="text-[#0A65CC] group-hover:text-white transition" />
                  </button>

                  <button className="group w-11 h-11 bg-[#E7F0FA] rounded flex items-center justify-center hover:bg-[#0A65CC] transition">
                    <FaYoutube className="text-[#0A65CC] group-hover:text-white transition" />
                  </button>

                </div>
              </div>
            </div>
          </div>

          
          <div className="mt-12">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              <ArrowLeft size={18} />
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};