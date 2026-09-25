import { EmployerProfile } from "../models/employerProfile.js";
import { Application } from "../models/application.model.js";
import { Job } from "../models/postjob.model.js";
import { SavedJob } from "../models/savedJob.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      location,
      salary,
      employmentType,
      experience,
      category,
      openings,
      deadline,
      status,
      skills,
      description,
    } = req.body;

    const employerProfile = await EmployerProfile.findOne({
      user: req.user._id,
    });

    if (!employerProfile) {
      return res.status(404).json({
        message: "Please Complete your profile",
      });
    }

    if (
      !title ||
      !location ||
      !salary ||
      !employmentType ||
      !experience ||
      !category ||
      !openings ||
      !deadline ||
      !description
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const job = await Job.create({
      employer: req.user._id,
      title,
      company: employerProfile.company,
      location,
      salary,
      employmentType,
      experience,
      category,
      openings,
      deadline,
      status,
      skills,
      description,
    });

    return res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// export const getJobs = async (req, res) => {
//   try {
//     const posts = await Job.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal Server Error",
//       error,
//     });
//   }
// };

export const getJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      category,
      company,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    filter.deadline = {
      $gt: new Date(),
    };

    if (company) {
      filter.company = {
        $regex: company,
        $options: "i",
      };
    }

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const totalJobs = await Job.countDocuments(filter);
//acending or descending
    const sortOrder = sortBy === "oldest" ? 1 : -1;

    const posts = await Job.find(filter)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: sortOrder });

    const totalPages = Math.ceil(totalJobs / limitNumber);

    let savedJobIds = [];

    if (req.user?._id) {
      const savedJobs = await SavedJob.find({
        user: req.user._id,
        job: { $in: posts.map((job) => job._id) },
      }).select("job");

      savedJobIds = savedJobs.map((saved) =>
        saved.job.toString()
      );
    }

    const jobs = posts.map((job) => ({
      ...job.toObject(),
      isSaved: savedJobIds.includes(
        job._id.toString()
      ),
    }));

    res.status(200).json({
      jobLists: jobs,
      pagination: {
        currentPage: pageNumber,
        totalPages: totalPages,
        totalJobs: totalJobs,
        limit: limitNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

// get job by person id-means posted person could see the jobs

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      employer: req.user._id,
    });

    return res.status(200).json({
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get a single job

export const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json({
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//update Job

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this job",
      });
    }

    const {
      title,
      company,
      location,
      salary,
      employmentType,
      experience,
      category,
      openings,
      deadline,
      status,
      skills,
      description,
      responsibilities,
    } = req.body;

    job.title = title;
    job.company = company;
    job.location = location;
    job.salary = salary;
    job.employmentType = employmentType;
    job.experience = experience;
    job.category = category;
    job.openings = openings;
    job.deadline = deadline;
    job.status = status;
    job.skills = skills;
    job.description = description;
    job.responsibilities = responsibilities;

    const updatedJob = await job.save();

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.log("Update job error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//delete job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({
      _id: id,
      employer: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found or you are not authorized to delete this job",
      });
    }

    await Job.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get recent jobs

export const getRecentJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      employer: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      message: "Latest 5 jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get employerstats

export const getEmployerStats = async (req, res) => {
  try {
    const employerId = req.user._id;

    //total jobs
    const totalJobs = await Job.countDocuments({
      employer: employerId,
    });

    //Active job
    const activeJobs = await Job.countDocuments({
      employer: employerId,
      status: "Active",
    });
    //closed jobs
    const closedJobs = await Job.countDocuments({
      employer: employerId,
      status: "Closed",
    });

    const employerJobs = await Job.find({ employer: employerId }, { _id: 1 });
    const jobIds = employerJobs.map((job) => job._id);

    //applicants count
    const applicants = await Application.countDocuments({
      job: { $in: jobIds },
    });

    return res.status(200).json({
      message: "Employer statistics fetched successfully",
      stats: {
        totalJobs,
        activeJobs,
        closedJobs,
        applicants,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//saved Jobs

export const savedJobs = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const job = await Job.findById(jobId);

    if (!job) {
      res.status(404).json({
        message: "Job not Found",
      });
    }

    const existingSavedJob = await SavedJob.findOne({
      user: userId,
      job: jobId,
    });

    if (existingSavedJob) {
      await SavedJob.findByIdAndDelete(existingSavedJob._id);

      return res.status(200).json({
        message: "Job removed from savedjobs",
        isSaved: false,
      });
    }

    await SavedJob.create({
      user: userId,
      job: jobId,
    });

    return res.status(201).json({
      message: "Job saved successfully",
      isSaved: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get saved jobs

export const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({
      user: req.user._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    const jobs = savedJobs
      .filter((saved) => saved.job)
      .map((saved) => ({
        ...saved.job.toObject(),
        isSaved: true,
      }));

    return res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.log("Get saved jobs error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
