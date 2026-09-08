import { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs((prev) => [...prev, job]);
  };

  const updateJob = (updatedJob) =>{
    setJobs((prevJobs)=>prevJobs.map((job)=>job.id === updatedJob.id ? updatedJob : job)
    ) 
  }

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        
      }}
    >
      {children}
    </JobContext.Provider>
  );
};