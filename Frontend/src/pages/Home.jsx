import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { PopularJobs } from "../components/PopularJobs";
import { JobpilotWorking } from "../components/JobpilotWorking";
import { PopularCategory } from "../components/PopularCategory";
import { FeaturedJob } from "../components/FeaturedJob";
import { Topcompanies } from "../components/Topcompanies";
import { Testimonials } from "../components/Testimonials"; 
import { Register } from "../components/Register";
import { Footer } from "../components/Footer";

export const Home = () => {
     return (
       <>
       <Navbar/>
       <Hero/>
       <PopularJobs/>
       <JobpilotWorking/>
       <PopularCategory/>
       <FeaturedJob/>
       <Topcompanies/>
       <Testimonials/>
       <Register/>
       <Footer/>
   
       </>
     );
   }